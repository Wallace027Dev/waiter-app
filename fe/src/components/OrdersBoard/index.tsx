import { Board, OrdersContainer } from "./styles";

import { Order } from '../../types/Order'

interface ORdersBoardsProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title }: ORdersBoardsProps) {
  return (
    <Board>
        <header>
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>(1)</span>
        </header>

        <OrdersContainer>
          <button type="button">
            <strong>Mesa 2</strong>
            <span>Mesa 2</span>
          </button>
          <button type="button">
            <strong>Mesa 1</strong>
            <span>Mesa 1</span>
          </button>
        </OrdersContainer>
      </Board>
  )
}
