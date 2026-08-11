import { Request, Response } from 'express';
import { Server } from 'socket.io';

import { Order } from '../../models/Order';

export async function cancelOrder(req: Request, res: Response) {
  try {
    const {orderId} = req.params;

    await Order.findByIdAndDelete(orderId);

    const io = req.app.get('io') as Server | undefined;
    io?.emit('orders@cancel', orderId);

    res.sendStatus(204);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
