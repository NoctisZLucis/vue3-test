// file-saver 模块类型声明
declare module 'file-saver' {
    export function saveAs(data: Blob | string, filename?: string, options?: any): void;
}
