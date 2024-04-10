import { useState } from 'react';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContiner } from './styles';

import { products } from '../mocks/products';

import { CartItem } from '../types/CartItem';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			quantity: 1,
			product: products[0],
		},
		{
			quantity: 2,
			product: products[1],
		},
	]);

	function handleSaveTable(table: string) {
		setSelectTable(table);
	}

	function handleCancelOrder() {
		setSelectTable('');
	}

	return(
		<>
			<Container>
				<Header
					selectedTable={selectedTable}
					onCancelOrder={handleCancelOrder}
				/>

				<CategoriesContainer>
					<Categories />
				</CategoriesContainer>

				<MenuContainer>
					<Menu />
				</MenuContainer>

			</Container>

			<Footer>
				<FooterContiner>
					{!selectedTable && (
						<Button onPress={() => setIsTableModalVisible(true)}>
						Novo Pedido
						</Button>
					)}

					{selectedTable && (
						<Cart cartItems={cartItems} />
					)}
				</FooterContiner>

				<TableModal
					visible={isTableModalVisible}
					onClose={() => setIsTableModalVisible(false)}
					onSave={handleSaveTable}
				/>
			</Footer>
		</>
	);
}
