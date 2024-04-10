import { useState } from 'react';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContiner } from './styles';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	function handleSaveTable(table: string) {
		setSelectTable(table);
	}

	function handleResetOrder() {
		setSelectTable('');
		setCartItems([]);
	}

	function handleAddToCart(product: Product) {
		if (!selectedTable) {
			setIsTableModalVisible(true);
		}

		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartItem => cartItem.product._id === product._id
			);

			if (itemIndex < 0) {
				return prevState.concat({
					quantity: 1,
					product,
				});
			}

			const newCartItems = [...prevState];
			const item = newCartItems[itemIndex];

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity + 1,
			};

			return newCartItems;
		});
	}

	function handleDecreaseCartItem(product: Product) {
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartItem => cartItem.product._id === product._id
			);

			const item = prevState[itemIndex];

			const newCartItems = [...prevState];
			if (item.quantity === 1) {
				newCartItems.splice(itemIndex, 1);

				return newCartItems;
			}

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity - 1,
			};

			return newCartItems;
		});
	}

	return(
		<>
			<Container>
				<Header
					selectedTable={selectedTable}
					onCancelOrder={handleResetOrder}
				/>

				<CategoriesContainer>
					<Categories />
				</CategoriesContainer>

				<MenuContainer>
					<Menu onAddToCart={handleAddToCart} />
				</MenuContainer>

			</Container>

			<Footer>
				{/* <FooterContiner> */}
				{!selectedTable && (
					<Button onPress={() => setIsTableModalVisible(true)}>
						Novo Pedido
					</Button>
				)}

				{selectedTable && (
					<Cart
						cartItems={cartItems}
						onAdd={handleAddToCart}
						onDecrease={handleDecreaseCartItem}
						onConfirmOrder={handleResetOrder}
					/>
				)}
				{/* </FooterContiner> */}

				<TableModal
					visible={isTableModalVisible}
					onClose={() => setIsTableModalVisible(false)}
					onSave={handleSaveTable}
				/>
			</Footer>
		</>
	);
}
