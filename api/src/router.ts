import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategorie } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
  })
});

router.get('/categories', listCategories);
router.post('/categories', createCategorie);


router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProduct);

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
