import fs from 'node:fs';
import path from 'node:path';
import request from 'supertest';

import { createApp } from '../app';
import { Category } from '../app/models/Category';
import { connect, clearDatabase, closeDatabase } from './helpers/db';

const app = createApp();
const uploadsDir = path.resolve(__dirname, '../../uploads');
const createdFiles: string[] = [];

// 1x1 PNG transparente
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

beforeAll(connect);
afterEach(clearDatabase);
afterAll(async () => {
  // remove só os arquivos que os testes criaram (não toca nos commitados)
  for (const file of createdFiles) {
    const full = path.join(uploadsDir, file);
    if (fs.existsSync(full)) fs.unlinkSync(full);
  }
  await closeDatabase();
});

async function makeCategory() {
  return Category.create({ icon: '🍕', name: 'Pizzas' });
}

describe('Products', () => {
  it('POST /products cria um produto com upload de imagem', async () => {
    const category = await makeCategory();

    const res = await request(app)
      .post('/products')
      .field('name', 'Margherita')
      .field('description', 'Molho, muçarela e manjericão')
      .field('price', '39.9')
      .field('category', String(category._id))
      .field('ingredients', JSON.stringify([{ name: 'Queijo', icon: '🧀' }]))
      .attach('image', PNG, 'pizza.png');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Margherita');
    expect(res.body.price).toBe(39.9);
    expect(res.body.imagePath).toBeTruthy();
    createdFiles.push(res.body.imagePath);
  });

  it('GET /products lista os produtos', async () => {
    const category = await makeCategory();
    const created = await request(app)
      .post('/products')
      .field('name', 'Calabresa')
      .field('description', 'Calabresa e cebola')
      .field('price', '42')
      .field('category', String(category._id))
      .field('ingredients', JSON.stringify([]))
      .attach('image', PNG, 'calabresa.png');
    createdFiles.push(created.body.imagePath);

    const res = await request(app).get('/products');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Calabresa');
  });

  it('GET /categories/:categoryId/products filtra por categoria', async () => {
    const category = await makeCategory();
    const created = await request(app)
      .post('/products')
      .field('name', 'Portuguesa')
      .field('description', 'Presunto, ovo e ervilha')
      .field('price', '45')
      .field('category', String(category._id))
      .field('ingredients', JSON.stringify([]))
      .attach('image', PNG, 'portuguesa.png');
    createdFiles.push(created.body.imagePath);

    const res = await request(app).get(
      `/categories/${category._id}/products`
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Portuguesa');
  });
});
