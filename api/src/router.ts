import { Router } from 'express';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategorie } from './app/useCases/categories/createCategory';

export const router = Router();

router.get('/categories', listCategories);

router.post('/categories', createCategorie);

router.get('/categories/:categoryId/products', (req, res) => {
  res.send('OK');
});

router.get('/orders', (req, res) => {
  res.send('OK');
});

router.patch('/orders:orderId', (req, res) => {
  res.send('OK');
});

router.delete('/orders:orderId', (req, res) => {
  res.send('OK');
});
