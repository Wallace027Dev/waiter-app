import { useState } from 'react';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';

import { products as mockProducts } from '../mocks/products';

import {
	Container,
	CategoriesContainer,
	MenuContainer,
	Footer,
	FooterContiner,
	CenteredContainer
} from './styles';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';

export function Main() {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>(mockProducts);
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

				{isLoading && (
					<CenteredContainer>
						<ActivityIndicator color="#d73035" size="large" />
					</CenteredContainer>
				)}

				{!isLoading && (
					<>
						<CategoriesContainer>
							<Categories />
						</CategoriesContainer>

						{products.length > 0 ? (
							<MenuContainer>
								<Menu
									onAddToCart={handleAddToCart}
									products={products}
								/>
							</MenuContainer>
						) : (
							<CenteredContainer>
								<Empty />
								<Text color="#666" style={{ marginTop: 24 }}>
									Nenhum produto foi encontrado!
								</Text>
							</CenteredContainer>
						)}
					</>
				)}

			</Container>

			<Footer>
				{/* <FooterContiner> */}
				{!selectedTable && (
					<Button
						onPress={() => setIsTableModalVisible(true)}
						disabled={isLoading}
					>
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
