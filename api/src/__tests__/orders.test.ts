import request from 'supertest';

import { createApp } from '../app';
import { Category } from '../app/models/Category';
import { Product } from '../app/models/Product';
import { connect, clearDatabase, closeDatabase } from './helpers/db';

const app = createApp();

beforeAll(connect);
afterEach(clearDatabase);
afterAll(closeDatabase);

async function seedProduct() {
  const category = await Category.create({ icon: '🍕', name: 'Pizzas' });
  const product = await Product.create({
    name: 'Margherita',
    description: 'Molho, muçarela e manjericão',
    imagePath: 'seed.png',
    price: 39.9,
    ingredients: [],
    category: category._id,
  });
  return product;
}

async function createOrder() {
  const product = await seedProduct();
  return request(app)
    .post('/orders')
    .send({ table: '5', products: [{ product: String(product._id), quantity: 2 }] });
}

describe('Orders', () => {
  it('POST /orders cria um pedido com status WAITING', async () => {
    const res = await createOrder();

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.table).toBe('5');
    expect(res.body.status).toBe('WAITING');
    expect(res.body.products).toHaveLength(1);
  });

  it('GET /orders lista os pedidos', async () => {
    await createOrder();

    const res = await request(app).get('/orders');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('PATCH /orders/:id muda o status do pedido', async () => {
    const created = await createOrder();

    const patch = await request(app)
      .patch(`/orders/${created.body._id}`)
      .send({ status: 'IN_PRODUCTION' });
    expect(patch.status).toBe(204);

    const list = await request(app).get('/orders');
    expect(list.body[0].status).toBe('IN_PRODUCTION');
  });

  it('PATCH /orders/:id rejeita status inválido com 400', async () => {
    const created = await createOrder();

    const patch = await request(app)
      .patch(`/orders/${created.body._id}`)
      .send({ status: 'FLYING' });

    expect(patch.status).toBe(400);
  });

  it('DELETE /orders/:id cancela o pedido', async () => {
    const created = await createOrder();

    const del = await request(app).delete(`/orders/${created.body._id}`);
    expect(del.status).toBe(204);

    const list = await request(app).get('/orders');
    expect(list.body).toHaveLength(0);
  });
});
