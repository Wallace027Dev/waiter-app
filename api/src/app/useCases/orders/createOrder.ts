import { Request, Response } from 'express';
import { Server } from 'socket.io';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const order = await Order.create({ table, products });

    const io = req.app.get('io') as Server | undefined;
    io?.emit('orders@new', order);

    res.status(201).json(order);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
