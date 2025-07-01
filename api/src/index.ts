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

mongoose
  .connect(
    'mongodb+srv://wawaagp:Es9r2BmlRRlyewcI@waiterapp.n08ezge.mongodb.net'
  )
  .then(() => {
    const app = express();
    const port = 3001;

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

    app.listen(port, () => {
      console.log(`🔥 Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log('Erro ao conectar ao mongo'));
