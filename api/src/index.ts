import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import { router } from './router';
import { Express } from 'express';

interface SwaggerSetup {
  (app: Express): void;
}

const setupSwagger: SwaggerSetup = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

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
    const app = express();

    setupSwagger(app);

    app.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🔥 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });
