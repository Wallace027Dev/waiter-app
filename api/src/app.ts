import path from 'node:path';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';
import { router } from './router';

/**
 * Cria e configura a aplicação Express (sem conectar ao banco nem escutar
 * porta). Isolar isso permite testar as rotas com Supertest.
 */
export function createApp(): Express {
  const app = express();

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  app.use(express.json());
  app.use(router);

  return app;
}
