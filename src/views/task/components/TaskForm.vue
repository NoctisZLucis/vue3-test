<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="800px"
    @close="handleClose"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="0" :show-message="false">
      <div class="custom-form-table">
        <!-- 第一行 -->
        <div class="form-row">
          <div class="form-label required">任务名称</div>
          <div class="form-content">
            <el-form-item prop="name" style="margin-bottom: 0; width: 100%;">
              <el-input v-model="form.name" :readonly="isDetail" />
            </el-form-item>
          </div>
          <div class="form-label required">任务类型</div>
          <div class="form-content">
             <el-form-item prop="type" style="margin-bottom: 0; width: 100%;">
              <el-select v-model="form.type" style="width: 100%" :disabled="isDetail">
                <el-option label="事件联调" value="事件联调" />
                <el-option label="终端联网" value="终端联网" />
                <el-option label="系统升级" value="系统升级" />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <!-- 第二行 -->
        <div class="form-row">
          <div class="form-label required">优先级</div>
          <div class="form-content">
             <el-form-item prop="priority" style="margin-bottom: 0">
               <el-radio-group v-model="form.priority" :disabled="isDetail">
                 <el-radio label="高">高</el-radio>
                 <el-radio label="中">中</el-radio>
                 <el-radio label="低">低</el-radio>
               </el-radio-group>
             </el-form-item>
          </div>
          <div class="form-label required">期望完成时间</div>
          <div class="form-content">
            <el-form-item prop="dueTime" style="margin-bottom: 0; width: 100%;">
              <el-date-picker
                v-model="form.dueTime"
                type="datetime"
                style="width: 100%"
                value-format="YYYY-MM-DD HH:mm:ss"
                :disabled="isDetail"
              />
            </el-form-item>
          </div>
        </div>

        <!-- 第三行 -->
         <div class="form-row">
          <div class="form-label">发起人</div>
          <div class="form-content spanned">
            <el-form-item prop="initiator" style="margin-bottom: 0; width: 100%;">
               <el-select 
                 v-model="form.initiator" 
                 multiple 
                 collapse-tags 
                 :max-collapse-tags="5"
                 collapse-tags-tooltip
                 placeholder="请选择" 
                 style="width: 100%"
                 :disabled="isDetail"
               >
                 <el-option 
                   v-for="item in userOptions" 
                   :key="item.value" 
                   :label="item.label" 
                   :value="item.value" 
                 />
               </el-select>
            </el-form-item>
          </div>
        </div>
        
        <!-- 第四行 (可选，增加描述) -->
         <div class="form-row">
          <div class="form-label">描述</div>
          <div class="form-content spanned">
            <el-form-item prop="description" style="margin-bottom: 0; width: 100%;">
               <el-input v-model="form.description" type="textarea" :rows="3" resize="none" :readonly="isDetail" />
            </el-form-item>
          </div>
        </div>

      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <template v-if="isDetail">
            <el-button @click="handleClose">关闭</el-button>
        </template>
        <template v-else>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watch, ref, computed } from 'vue';
import type { TaskItem, UserItem } from '@/api/task';
import { getTaskUsers } from '@/api/task';
import { type FormInstance, type FormRules } from 'element-plus';
import Message from '@/utils/message';
import { onMounted } from 'vue';

const props = defineProps<{
  visible: boolean;
  data?: TaskItem | null; // 编辑/详情时传入的数据
  mode?: 'add' | 'edit' | 'detail'; // 默认为 add
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'submit', data: any): void;
}>();

const formRef = ref<FormInstance>();
const title = ref('新增任务');
const userOptions = ref<UserItem[]>([]);

// 是否为详情模式
const isDetail = computed(() => props.mode === 'detail');

const form = reactive({
  name: '',
  type: '',
  priority: '',
  dueTime: '',
  initiator: [] as string[], // 改为数组
  description: ''
});

// 获取用户列表
onMounted(async () => {
    try {
        const res = await getTaskUsers();
        userOptions.value = res;
    } catch (e) {
        console.error(e);
    }
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
  priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
  dueTime: [{ required: true, message: '请选择期望完成时间', trigger: 'change' }]
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      const mode = props.mode || 'add';
      if (mode === 'add') {
         title.value = '新增任务';
         // 重置表单
         form.name = '';
         form.type = '';
         form.priority = '';
         form.dueTime = '';
         form.initiator = [];
         form.description = '';
      } else {
         // edit 或 detail
         title.value = mode === 'edit' ? '编辑任务' : '任务详情';
         if (props.data) {
             form.name = props.data.name;
             form.type = props.data.type;
             form.priority = props.data.priority;
             form.dueTime = props.data.dueTime;
             form.initiator = props.data.initiator ? [props.data.initiator] : []; 
             form.description = ''; // 暂时没传 description，置空
         }
      }
    }
  }
);

const handleClose = () => {
  emit('update:visible', false);
  formRef.value?.resetFields();
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', { ...form });
      handleClose();
    } else {
        Message.warning('请完善表单信息');
    }
  });
};
</script>

<style scoped lang="scss">
.custom-form-table {
  border: 1px solid #dcdfe6;
  border-bottom: none; // 每一行都有 bottom-border，防止重叠
  
  .form-row {
    display: flex;
    border-bottom: 1px solid #dcdfe6;
    
    .form-label {
      width: 120px;
      background-color: #f5f7fa; // 浅灰背景，或根据图片调成浅蓝 #ecf5ff
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #606266;
      font-weight: bold;
      border-right: 1px solid #dcdfe6;
      font-size: 14px;
      
      &.required::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }
    
    .form-content {
      flex: 1;
      padding: 0; // 去除内边距，让输入框填满
      display: flex;
      align-items: center;
      border-right: 1px solid #dcdfe6;
      
      &:last-child {
        border-right: none;
      }

      &.spanned {
          flex: 3.5; // 近似跨越
      }

      // 重写 Element Plus 样式，实现无边框融合效果
      :deep(.el-form-item__content) {
         margin-left: 0 !important;
      }
      
      :deep(.el-input__wrapper), 
      :deep(.el-textarea__inner),
      :deep(.el-select__wrapper) {
         box-shadow: none !important; // 去除默认边框/阴影
         border-radius: 0;
         background-color: transparent;
         padding: 8px 12px; // 恢复内部 spacing
      }

      :deep(.el-radio-group) {
          padding-left: 12px;
      }

      // 校验错误样式
      :deep(.el-form-item.is-error) {
          background-color: #fef0f0; // 淡黄色背景 (Element UI 错误色偏红，#fef0f0 是浅红，#fdf6ec 是浅黄，用户说淡黄但校验通常是红，这里用浅红更自然，或 #ffffcc 浅黄)
          // 用户特别说淡黄，用 warning 的浅色 #fdf6ec 吧，或者纯正淡黄 #ffffcc。这里暂用 #FEF0F0 (Error light) 符合 "出错" 语境，用户可能指的高亮色。
          // 再次确认用户需求： "表单内整体变成淡黄色" -> 尝试 #fdf6ec (Warning Light) 或 #fffbe6.
          // 但通常校验也是红色。这里用 #fef0f0 比较标准。
          background-color: #fdf6ec; 
          height: 100%;
          display: flex;
          align-items: center;
          width: 100%;
      }
    }
  }
}
</style>
