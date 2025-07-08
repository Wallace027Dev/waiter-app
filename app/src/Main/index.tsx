import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import {
	Container,
	CategoriesContainer,
	MenuContainer,
	Footer,
	CenteredContainer
} from './styles';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Category } from '../types/Category';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';

import { api } from '../utils/api';

export function Main() {
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);

	useEffect(() => {
		Promise.all([
			api.get('/categories'),
			api.get('/products'),
		]).then(([categoriesResponse, productsResponse]) => {
			console.log('Categorias recebidas:', categoriesResponse.data);
			console.log('Produtos recebidos:', productsResponse.data);

			setCategories(categoriesResponse.data);
			setProducts(productsResponse.data);
			setIsLoading(false);
		}).catch((error) => {
			console.error('Erro ao buscar dados da API:', error);
		});
	}, []);

	async function handleSelectCategory(categoryId: string) {
		const route = !categoryId
			? '/products'
			: `/categories/${categoryId}/products`;

		setIsLoadingProducts(true);
		try {
			const { data } = await api.get(route);
			console.log(`Produtos da categoria ${categoryId}:`, data);

			setProducts(data);
		} catch (error) {
			console.error('Erro ao buscar produtos por categoria:', error);
		}
		setIsLoadingProducts(false);
	}

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
							<Categories
								categories={categories}
								onSelectCategory={handleSelectCategory}
							/>
						</CategoriesContainer>

						{isLoadingProducts ? (
							<CenteredContainer>
								<ActivityIndicator color="#d73035" size="large" />
							</CenteredContainer>
						) : (
							<>
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
					</>
				)}

			</Container>

			<Footer>
				{/* <FooterContainer> */}
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
						selectedTable={selectedTable}
					/>
				)}
				{/* </FooterContainer> */}

				<TableModal
					visible={isTableModalVisible}
					onClose={() => setIsTableModalVisible(false)}
					onSave={handleSaveTable}
				/>
			</Footer>
		</>
	);
}
