// src/NotificationProvider.ts
import { Message } from './types';

export class NotificationProvider {
  send(messages: Message[]): void {
    if (messages.length === 0) return;

    // Имитация ошибки для теста
    if (Math.random() < 0.2) {
      throw new Error('Failed to send notifications');
    }

    const ids = messages.map(m => m.id).join(', ');
    console.log(`Sent messages: ${ids}`);
  }
}