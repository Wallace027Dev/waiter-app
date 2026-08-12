import 'dotenv/config';
import http from 'node:http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { createApp } from './app';

const MONGO_URL = process.env.MONGO_URL;
const PORT = Number(process.env.PORT) || 3001;

if (!MONGO_URL) {
  console.error(
    '❌ Variável MONGO_URL não definida. Copie api/.env.example para api/.env e preencha a connection string.'
  );
  process.exit(1);
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    const app = createApp();
    const server = http.createServer(app);
    const io = new Server(server, { cors: { origin: '*' } });

    // Disponibiliza o io para os handlers via req.app.get('io')
    app.set('io', io);

    server.listen(PORT, () => {
      console.log(`🔥 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });
