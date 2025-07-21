// src/server.ts
import express, { Request, Response } from 'express';
import { NotificationService } from './NotificationService';
import { MessageQueue } from './MessageQueue';
import { NotificationProvider } from './NotificationProvider';

// Создаем очередь, провайдер и сервис
const queue = new MessageQueue();
const provider = new NotificationProvider();
const service = new NotificationService(queue, provider);

const app = express();
const PORT = process.env.PORT || 3000;

// Парсинг JSON в теле запроса
app.use(express.json());

// Роут для добавления сообщения в очередь
app.post('/messages', (req: Request, res: Response) => {
  const { id, content } = req.body;

  if (!id || !content) {
    return res.status(400).json({ error: 'Missing id or content' });
  }

  queue.add({ id, content });
  res.status(201).json({ message: 'Message added to queue' });
});

// Роут для запуска обработки сообщений
app.post('/process', (req: Request, res: Response) => {
  const { batchSize } = req.body;

  if (!batchSize || typeof batchSize !== 'number' || batchSize <= 0) {
    return res.status(400).json({ error: 'Valid batchSize is required' });
  }

  service.processMessages(batchSize);
  res.json({ message: `Processed messages in batch of ${batchSize}` });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});