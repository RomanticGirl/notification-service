// src/index.ts
import { MessageQueue } from './MessageQueue';
import { NotificationProvider } from './NotificationProvider';
import { NotificationService } from './NotificationService';

const queue = new MessageQueue();
const provider = new NotificationProvider();
const service = new NotificationService(queue, provider);

// Заполняем очередь
for (let i = 1; i <= 25; i++) {
  queue.add({ id: `msg-${i}`, content: `Сообщение #${i}` });
}

// Обрабатываем батчами по 10
for (let i = 0; i < 3; i++) {
  console.log(`\n--- Batch ${i + 1} ---`);
  service.processMessages(10);
}