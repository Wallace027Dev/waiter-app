import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { Order } from "../../types/Order";

import { OrdersBoard } from "../OrdersBoard";

import { Container } from "./styles";
import { api, API_URL } from "../../utils/api";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
      api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      })
  }, []);

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order: Order) => {
      setOrders((prevState) => [...prevState, order]);
    });

    socket.on(
      'orders@statusChange',
      ({ orderId, status }: { orderId: string; status: Order['status'] }) => {
        setOrders((prevState) =>
          prevState.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      }
    );

    socket.on('orders@cancel', (orderId: string) => {
      setOrders((prevState) =>
        prevState.filter((order) => order._id !== orderId)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING')
  const prodution = orders.filter((order) => order.status === 'IN_PRODUCTION')
  const done = orders.filter((order) => order.status === 'DONE')

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId))
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
      ? { ...order, status }
      : order
    )))

  }
  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="🕒"
        title="Preparação"
        orders={prodution}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

    </Container>
  )
}
