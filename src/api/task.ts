import request from '@/utils/request';

export interface TaskStat {
    label: string;
    value: number;
    icon: string;
    color: string;
    type?: string;
}

export interface TaskFilterItem {
    label: string;
    value: string;
    count: number;
}

export interface TaskFilters {
    priority: TaskFilterItem[];
    status: TaskFilterItem[];
    category: TaskFilterItem[];
}

export interface TaskType {
    label: string;
    value: string;
}

export interface TaskItem {
    no: string;
    name: string;
    type: string;
    priority: string;
    createTime: string;
    dueTime: string;
    initiator: string;
    assignee: string;
    statusType: string;
    statusText: string;
    isOverdue: boolean;
}

/**
 * 获取统计卡片数据
 */
export const getTaskStats = () => {
    return request.get<any, TaskStat[]>('/task/stats');
};

/**
 * 获取筛选器配置
 */
export const getTaskFilters = () => {
    return request.get<any, TaskFilters>('/task/filters');
};

/**
 * 获取事项类型枚举
 */
export const getTaskTypes = () => {
    return request.get<any, TaskType[]>('/task/types');
};

/**
 * 获取任务列表
 */
export const getTaskList = (params: any) => {
    return request.get<any, { list: TaskItem[], total: number }>('/task/list', { params });
};

/**
 * 删除任务
 */
export const deleteTask = (id: string) => {
    return request.post('/api/task/delete', { id });
};

export interface UserItem {
    label: string;
    value: string;
}

/**
 * 获取用户列表
 */
export const getTaskUsers = () => {
    return request.get<any, UserItem[]>('/task/users');
};
