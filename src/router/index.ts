import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// 提取 Layout 为常量，以便代码复用和重构
const Layout = () => import('@/layout/index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: '首页', icon: 'House' }
            },
        ]
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
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        meta: { title: '路由嵌套', icon: 'Menu' },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Menu1',
                meta: { title: '菜单一', icon: 'Document' }
            },
            {
                path: 'menu2',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Menu2',
                meta: { title: '菜单二', icon: 'Document' },
                children: [
                    {
                        path: 'menu2-1',
                        component: () => import('@/views/dashboard/index.vue'),
                        name: 'Menu2-1',
                        meta: { title: '菜单二-1' }
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
