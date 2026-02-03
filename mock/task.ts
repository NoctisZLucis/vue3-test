import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
const Random = Mock.Random;

export default [
    // 统计与卡片
    {
        url: '/api/task/stats',
        method: 'get',
        response: () => {
            return {
                code: 200,
                msg: 'success',
                data: [
                    { label: '待办事项', value: Random.integer(1, 10), icon: 'List', color: '#ff9900', type: 'todo' },
                    { label: '已办事项', value: Random.integer(10, 50), icon: 'Check', color: '#19be6b', type: 'done' },
                    { label: '待发事项', value: Random.integer(0, 5), icon: 'Promotion', color: '#909399', type: 'pending_send' },
                    { label: '已发事项', value: Random.integer(5, 20), icon: 'Box', color: '#409eff', type: 'sent' },
                    { label: '全部事项', value: Random.integer(50, 100), icon: 'Box', color: '#409eff', type: 'all' },
                    { label: '超期事项', value: Random.integer(0, 5), icon: 'Warning', color: '#f56c6c', type: 'overdue' },
                ]
            };
        },
    },
    // 筛选器
    {
        url: '/api/task/filters',
        method: 'get',
        response: () => {
            return {
                code: 200,
                msg: 'success',
                data: {
                    priority: [
                        { label: '低', value: 'low', count: Random.integer(1, 10) },
                        { label: '中', value: 'medium', count: Random.integer(1, 10) },
                        { label: '高', value: 'high', count: Random.integer(1, 10) },
                    ],
                    status: [
                        { label: '处理中', value: 'processing', count: Random.integer(1, 10) },
                        { label: '已关闭', value: 'closed', count: Random.integer(1, 10) },
                        { label: '挂起中', value: 'pending', count: Random.integer(1, 10) },
                    ],
                    category: [
                        { label: '运维管理', value: 'ops', count: Random.integer(1, 10) },
                        { label: '事件处置', value: 'incident', count: Random.integer(1, 10) },
                    ]
                }
            };
        },
    },
    // 事项类型
    {
        url: '/api/task/types',
        method: 'get',
        response: () => {
            return {
                code: 200,
                msg: 'success',
                data: [
                    { label: '事件联调', value: '1' },
                    { label: '终端联网', value: '2' },
                    { label: '系统升级', value: '3' },
                ]
            };
        },
    },
    // 列表
    {
        url: '/api/task/list',
        method: 'get',
        response: ({ query }: any) => {
            const { page = 1, pageSize = 10 } = query;
            const list = [];
            for (let i = 0; i < pageSize; i++) {
                list.push({
                    no: '20211122' + Random.string('number', 3),
                    name: Random.ctitle(5, 10),
                    type: Random.pick(['事件联调', '终端联网', '系统升级']),
                    priority: Random.pick(['高', '中', '低']),
                    createTime: Random.datetime(),
                    dueTime: Random.datetime(),
                    initiator: Random.cname(),
                    assignee: Random.cname(),
                    statusType: Random.pick(['success', 'primary', 'warning']),
                    statusText: Random.pick(['已关闭', '处理中', '挂起中']),
                    isOverdue: Random.boolean(),
                });
            }
            return {
                code: 200,
                msg: 'success',
                data: {
                    list,
                    total: 400
                }
            };
        },
    },
] as MockMethod[];
