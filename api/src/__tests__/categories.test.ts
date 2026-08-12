import request from 'supertest';

import { createApp } from '../app';
import { connect, clearDatabase, closeDatabase } from './helpers/db';

const app = createApp();

beforeAll(connect);
afterEach(clearDatabase);
afterAll(closeDatabase);

describe('Categories', () => {
  it('POST /categories cria uma categoria', async () => {
    const res = await request(app)
      .post('/categories')
      .send({ icon: '🍕', name: 'Pizzas' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Pizzas');
    expect(res.body.icon).toBe('🍕');
  });

  it('GET /categories lista as categorias', async () => {
    await request(app).post('/categories').send({ icon: '🍔', name: 'Lanches' });

    const res = await request(app).get('/categories');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Lanches');
  });
});
