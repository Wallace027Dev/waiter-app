import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = [
  {
		"_id": "6570f8ca2ae073e4d681f593",
		"table": "3",
		"status": "WAITING",
		"products": [
			{
				"product": {
					"name": "Coca Cola",
					"imagePath": "1701901548572-coca-cola.png",
					"price": 7,
				},
				"quantity": 5,
				"_id": "6570f8ca2ae073e4d681f594"
			}
		],
	},
  {
		"_id": "6570e8ca2ae073e4d681f593",
		"table": "2",
		"status": "WAITING",
		"products": [
			{
				"product": {
					"name": "Coca Cola",
					"imagePath": "1701901548572-coca-cola.png",
					"price": 7,
				},
				"quantity": 5,
				"_id": "6570f8ca2ae073e4d681f594"
			}
		],
	}
]

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="🕒"
        title="Preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={[]}
      />

    </Container>
  )
}
