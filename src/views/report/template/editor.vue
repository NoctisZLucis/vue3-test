<template>
  <div class="editor-container">
    <div class="header">
      <div class="left">
        <el-button icon="ArrowLeft" @click="handleBack">返回</el-button>
        <el-input v-model="form.name" placeholder="请输入报表名称" style="width: 300px; margin-left: 10px" />
      </div>
      <div class="right">
        <el-dropdown class="download-dropdown" @command="handleDownload">
            <el-button type="success" icon="Download">
              导出报表<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="excel">导出 Excel</el-dropdown-item>
                <el-dropdown-item command="pdf">导出 PDF</el-dropdown-item>
                <el-dropdown-item command="wordA">导出 Word (方案A: docx)</el-dropdown-item>
                <el-dropdown-item command="wordB">导出 Word (方案B: html)</el-dropdown-item>
              </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-button type="primary" :loading="loading" @click="handleSave" style="margin-left: 12px">保存</el-button>
      </div>
    </div>
    <div id="luckysheet" class="sheet-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTemplateDetail, saveTemplate } from '@/api/report';
import Message from '@/utils/message';
import { ArrowDown, ArrowLeft } from '@element-plus/icons-vue';
// 导出相关依赖
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from 'docx';
// @ts-ignore
import { asBlob } from 'html-docx-js-typescript';


const route = useRoute();
const router = useRouter();

const loading = ref(false);
const form = reactive({
  id: '',
  name: ''
});

onMounted(async () => {
  const id = route.query.id as string;
  let config = {};

  if (id) {
    form.id = id;
    try {
      const res = await getTemplateDetail(id);
      form.name = res.name;
      if (res.content) {
         try {
             const sheets = JSON.parse(res.content);
             config = {
                 data: sheets,
                 title: res.name
             };
         } catch (e) {
             console.error('Parse content failed', e);
         }
      }
    } catch (e) {
      console.error(e);
    }
  }

  initSheet(config);
});


const initSheet = (config: any) => {
  const defaultData = [{
    "name": "Sheet1",
    "color": "",
    "status": 1,
    "order": 0,
    "data": [],
    "config": {},
    "index": 0
  }];

  const options = {
    container: 'luckysheet', // layuit的id
    title: '报表设计', // 设定表格名称
    lang: 'zh', // 设定表格语言
    showinfobar: false, // 是否显示顶部信息栏
    data: defaultData, // 表格内容
    ...config
  };
  
  console.log('Starting LuckySheet init...');
  
  const checkInterval = setInterval(() => {
     // @ts-ignore
     if (window.luckysheet) {
         clearInterval(checkInterval);
         console.log('LuckySheet found, initializing...');
         // @ts-ignore
         window.luckysheet.create(options);
     } else {
         console.log('Waiting for window.luckysheet...');
     }
  }, 100);

  // 超时保护
  setTimeout(() => {
      clearInterval(checkInterval);
  }, 10000);
};

const handleSave = async () => {
    if (!form.name) {
        Message.warning('请输入报表名称');
        return;
    }

    loading.value = true;
    try {
        // @ts-ignore
        const sheets = window.luckysheet.getAllSheets();
        // 去除一些不必要的临时数据，减少存储体积 (可选)
        // 这里直接简单存储
        const content = JSON.stringify(sheets);

        await saveTemplate({
            id: form.id,
            name: form.name,
            content
        });

        Message.success('保存成功');
        handleBack();
    } catch (e) {
        console.error(e);
        Message.error('保存失败');
    } finally {
        loading.value = false;
    }
};

const handleBack = () => {
    router.push('/report/template');
};

// --- 下载逻辑 ---

const handleDownload = (command: string) => {
    switch (command) {
        case 'excel':
            downloadExcel();
            break;
        case 'pdf':
            downloadPdf();
            break;
        case 'wordA':
            downloadWordA();
            break;
        case 'wordB':
            downloadWordB();
            break;
    }
};

const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    // @ts-ignore
    const sheets = window.luckysheet.getAllSheets();
    
    sheets.forEach((sheet: any) => {
        const worksheet = workbook.addWorksheet(sheet.name);
        // 简单的数据填充，实际场景需处理合并单元格、样式等
        if (sheet.data) {
            sheet.data.forEach((row: any[], rowIndex: number) => {
                row.forEach((cell: any, colIndex: number) => {
                    if (cell && cell.v !== null) {
                        const targetCell = worksheet.getCell(rowIndex + 1, colIndex + 1);
                        targetCell.value = cell.v;
                        // 简单背景色映射
                        if (cell.bg) {
                           targetCell.fill = {
                               type: 'pattern',
                               pattern: 'solid',
                               fgColor: { argb: cell.bg.replace('#', '') }
                           };
                        }
                    }
                });
            });
        }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${form.name || '报表'}.xlsx`);
};

const downloadPdf = () => {
    const element = document.getElementById('luckysheet');
    if (!element) return;
    
    // 隐藏一些 LuckySheet 的工具栏以优化截图 (可选)
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${form.name || '报表'}.pdf`);
    });
};

const downloadWordA = () => {
    // 方案A: 使用 docx.js 手动构建
    // 这里仅做简单演示：将第一张表的数据转为 Word 表格
    // @ts-ignore
    const sheets = window.luckysheet.getAllSheets();
    const firstSheet = sheets[0];
    
    if (!firstSheet || !firstSheet.data) {
        Message.warning('无数据可导出');
        return;
    }

    const tableRows = firstSheet.data.map((row: any[]) => {
        if (!row) return new TableRow({ children: [] });
        const cells = row.map((cell: any) => {
             const text = cell && cell.v ? String(cell.v) : '';
             return new TableCell({
                 children: [new Paragraph(text)],
             });
        });
        return new TableRow({ children: cells });
    });

    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ text: form.name || '报表导出', heading: 'Heading1' }),
                new Table({
                    rows: tableRows,
                    width: { size: 100, type: WidthType.PERCENTAGE }
                })
            ],
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${form.name || '报表'}_schemeA.docx`);
    });
};

const downloadWordB = () => {
    // 方案B: 获取 LuckySheet 的 HTML 结构转为 Word
    // 注意：LuckySheet 是 Canvas 绘制的 (部分版本)，直接获取 HTML 可能只获取到外壳
    // 但如果 LuckySheet 提供了 getHtml() 方法或者我们将数据渲染成 HTML 字符串再转换
    
    // 这里我们构建一个简单的 HTML 表格字符串来模拟
     // @ts-ignore
    const sheets = window.luckysheet.getAllSheets();
    const firstSheet = sheets[0];
    
    let html = `<h1>${form.name || '报表'}</h1><table border="1" style="border-collapse: collapse; width: 100%;">`;
    
    if (firstSheet && firstSheet.data) {
        firstSheet.data.forEach((row: any[]) => {
            html += '<tr>';
            if (row) {
                row.forEach((cell: any) => {
                    const value = cell && cell.v ? cell.v : '';
                    const bg = cell && cell.bg ? `background-color: ${cell.bg};` : '';
                    html += `<td style="${bg}">${value}</td>`;
                });
            }
            html += '</tr>';
        });
    }
    html += '</table>';

    // 完整的 HTML 文档结构
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Document</title></head>
      <body>${html}</body>
      </html>
    `;

    asBlob(fullHtml).then((blob: Blob) => {
        saveAs(blob, `${form.name || '报表'}_schemeB.docx`);
    });
};

</script>

<style scoped lang="scss">
.editor-container {
  height: 100vh; // 全屏
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000; // 盖过 Layout

  .header {
      height: 50px;
      border-bottom: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background: #fff;
  }

  .sheet-container {
      flex: 1;
      width: 100%;
      position: relative;
      margin: 0;
      padding: 0;
  }
}
</style>
