import request from '@/utils/request';

export interface ReportTemplateItem {
    id: string;
    name: string;
    createTime: string;
}

export interface ReportTemplateDetail extends ReportTemplateItem {
    content: string;
}

/**
 * 获取模板列表
 */
export const getTemplateList = (params?: any) => {
    return request.get<any, ReportTemplateItem[]>('/report/template/list', { params });
};

/**
 * 获取模板详情
 */
export const getTemplateDetail = (id: string) => {
    return request.get<any, ReportTemplateDetail>('/report/template/detail', { params: { id } });
};

/**
 * 保存模板
 */
export const saveTemplate = (data: { id?: string; name: string; content: string }) => {
    return request.post<any, any>('/report/template/save', data);
};

/**
 * 删除模板
 */
export const deleteTemplate = (id: string) => {
    return request.post<any, any>('/report/template/delete', { id });
};
