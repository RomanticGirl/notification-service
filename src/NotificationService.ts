// src/NotificationService.ts
import { MessageQueue } from './MessageQueue';
import { NotificationProvider } from './NotificationProvider';

export class NotificationService {
    constructor(
        private queue: MessageQueue,
        private provider: NotificationProvider
    ) { }

    processMessages(batchSize: number): void {
        const messages = this.queue.getMessages(batchSize);

        if (messages.length === 0) {
            console.log('Нет сообщений для обработки.');
            return;
        }

        try {
            this.provider.send(messages);
            this.queue.acknowledge(messages.map(m => `${m.id} : ${m.content}`));
        } catch (error: unknown) {
            // Проверяем, что error действительно содержит message
            if (typeof error === 'object' && error !== null && 'message' in error) {
                console.error(`Ошибка при отправке: ${(error as { message: string }).message}`);
            } else {
                console.error('Неожиданная ошибка:', error);
            }
        }
    }
}