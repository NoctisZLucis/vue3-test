import { ElMessage, type MessageHandler, type MessageParams } from 'element-plus';

// 维护当前显示的消息实例队列
const messageInstances: MessageHandler[] = [];
const MAX_MESSAGE_COUNT = 3;

// 封装的 Message 函数
const Message = (options: MessageParams) => {
    // 如果当前实例数达到上限，手动关闭最早的一个
    if (messageInstances.length >= MAX_MESSAGE_COUNT) {
        const oldestMessage = messageInstances.shift();
        oldestMessage?.close();
    }

    // 这里的 options 如果是对象，我们需要拦截 onClose；如果是字符串，我们需要构造成对象再拦截
    const normalizedOptions = (typeof options === 'string' ? { message: options } : { ...options }) as { onClose?: () => void;[key: string]: any };

    const userOnClose = normalizedOptions.onClose;

    normalizedOptions.onClose = () => {
        // 调用用户传入的 onClose
        userOnClose?.();

        // 从队列中移除当前实例（如果是自然关闭或被手动关闭）
        // 注意：这里需要找到对应的 instance 并移除
        // 由于 instance 在 ElMessage 返回后才生成，这里稍微有些异步依赖，
        // 但 onClose 执行时 instance 肯定已经存在。
        // 简单做一个清理：过滤掉已经关闭的 (visible false) 或者匹配当前关闭的
        // 这里简单实现：实际上 shift 逻辑主要处理“挤出”的情况。
        // 如果自然消失，我们也要从数组清理，否则数组会一直积压。
        const index = messageInstances.indexOf(instance);
        if (index !== -1) {
            messageInstances.splice(index, 1);
        }
    };

    const instance = ElMessage(normalizedOptions);
    messageInstances.push(instance);
    return instance;
};

// 挂载静态方法，模拟 ElMessage 的用法
(['success', 'warning', 'info', 'error'] as const).forEach(type => {
    (Message as any)[type] = (options: MessageParams) => {
        if (typeof options === 'string') {
            return Message({
                type,
                message: options
            });
        } else {
            return Message({
                ...options,
                type
            });
        }
    };
});

export default Message as typeof ElMessage;
