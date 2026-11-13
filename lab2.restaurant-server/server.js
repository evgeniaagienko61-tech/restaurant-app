import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './services/db.js';
import dishRoutes from './routes/dishRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Базові middleware
app.use(cors());
app.use(express.json());

// Middleware логування запитів
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Тестовий маршрут
app.get('/', (req, res) => {
  res.send('API ресторану працює успішно!');
});

// Підключення маршрутів меню
app.use('/api/dishes', dishRoutes);

// Підключення до БД та запуск сервера
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
  });
});