import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// 提取 Layout 为常量，以便代码复用和重构
const Layout = () => import('@/layout/index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/task/index',
        meta: { hidden: true }
    },
    {
        path: '/task',
        component: Layout,
        redirect: '/task/index',
        children: [
            {
                path: 'index',
                name: 'TaskManage',
                component: () => import('@/views/task/index.vue'),
                meta: { title: '任务管理', icon: 'List' }
            }
        ]
    },

    {
        path: '/report',
        component: Layout,
        redirect: '/report/template',
        meta: { title: '报表管理', icon: 'DataAnalysis' },
        children: [
            {
                path: 'template',
                name: 'ReportTemplate',
                component: () => import('@/views/report/template/index.vue'),
                meta: { title: '报表模板' }
            },
            {
                path: 'template/editor',
                name: 'ReportTemplateEditor',
                component: () => import('@/views/report/template/editor.vue'),
                meta: { title: '模板编辑器', hidden: true }
            }
        ]
    },
    {
        path: '/security',
        component: Layout,
        redirect: '/security/overview',
        meta: { title: '安全总览', icon: 'Monitor' },
        children: [
            {
                path: 'overview',
                name: 'SecurityOverview',
                component: () => import('@/views/security/overview/index.vue'),
                meta: { title: '网络安全概览' }
            }
        ]
    },
    {
        path: '/monitor',
        component: Layout,
        redirect: '/monitor/screen',
        meta: { title: '监控大屏', icon: 'Platform' },
        children: [
            {
                path: 'screen',
                name: 'MonitorScreen',
                component: () => import('@/views/monitor/screen/index.vue'),
                meta: { title: '污染源监控系统', hidden: true } // Usually hidden from sidebar or special icon
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
