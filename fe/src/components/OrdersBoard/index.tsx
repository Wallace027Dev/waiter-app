import { Board, OrdersContainer } from "./styles";

import { toast } from 'react-toastify';

import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { useState } from "react";
import { api } from "../../utils/api";

interface ORdersBoardsProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus
}: ORdersBoardsProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  function handleChangeOrderStatus() {
    setIsLoading(true);

    const status = selectedOrder?.status === "WAITING"
    ? "IN_PRODUCTION"
    : "DONE";

    api.patch(`/orders/${selectedOrder?._id}`, { status })

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`)
    onChangeOrderStatus(selectedOrder!._id, status)
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length}</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
