import { MockMethod } from 'vite-plugin-mock';

interface ReportTemplate {
    id: string;
    name: string;
    createTime: string;
    content: string; // JSON string of LuckySheet configuration
}

let templates: ReportTemplate[] = [
    {
        id: '1',
        name: '示例报表模板',
        createTime: '2023-01-01 12:00:00',
        content: JSON.stringify([{
            "name": "Sheet1",
            "color": "",
            "index": "1",
            "status": "1",
            "order": "0",
            "celldata": [],
            "config": {}
        }])
    }
];

export default [
    // 获取模板列表
    {
        url: '/api/report/template/list',
        method: 'get',
        response: () => {
            console.log('Mock API hit: /api/report/template/list');
            return {
                code: 200,
                msg: 'success',
                data: templates.map(t => ({ id: t.id, name: t.name, createTime: t.createTime }))
            };
        },
    },
    // 获取模板详情
    {
        url: '/api/report/template/detail',
        method: 'get',
        response: ({ query }) => {
            const { id } = query;
            const template = templates.find(t => t.id === id);
            if (template) {
                return {
                    code: 200,
                    msg: 'success',
                    data: template
                };
            } else {
                return {
                    code: 404,
                    msg: 'Template not found',
                    data: null
                };
            }
        },
    },
    // 保存模板
    {
        url: '/api/report/template/save',
        method: 'post',
        response: ({ body }) => {
            const { id, name, content } = body;
            if (id) {
                const index = templates.findIndex(t => t.id === id);
                if (index !== -1) {
                    templates[index].name = name;
                    templates[index].content = content;
                }
            } else {
                const newId = String(templates.length + 1);
                templates.push({
                    id: newId,
                    name: name,
                    createTime: new Date().toLocaleString(),
                    content: content
                });
            }
            return {
                code: 200,
                msg: 'success',
                data: null
            };
        },
    },
    // 删除模板
    {
        url: '/api/report/template/delete',
        method: 'post',
        response: ({ body }) => {
            const { id } = body;
            templates = templates.filter(t => t.id !== id);
            return {
                code: 200,
                msg: 'success',
                data: null
            };
        },
    },
] as MockMethod[];
