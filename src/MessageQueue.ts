// src/MessageQueue.ts
import { Message } from './types';

export class MessageQueue {
  private queue: Message[] = [];

  // Для демонстрации добавляем метод наполнения
  public add(message: Message): void {
    this.queue.push(message);
  }

  // Получаем батч сообщений
  public getMessages(batchSize: number): Message[] {
    return this.queue.splice(0, batchSize);
  }

  // Подтверждение обработки
  public acknowledge(messageIds: string[]): void {
    console.log(`Acknowledged messages: ${messageIds.join(', ')}`);
  }
}