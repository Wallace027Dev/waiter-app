import { Router } from 'express';
import { listCategories } from './app/useCases/categories/listCategories';

export const router = Router();

router.get('/categories', listCategories);

router.post('/categories', (req, res) => {
  res.send('OK');
});

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
