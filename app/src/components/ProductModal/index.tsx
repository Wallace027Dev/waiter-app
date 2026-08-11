import { FlatList, Modal } from 'react-native';

import { Product } from '../../types/Product';

import { Text} from '../Text';
import { Image,
	CloseButton,
	Header,
	ModalBody,
	IngredientsContainer,
	Ingredients,
	Footer,
	FooterContainer,
	PriceContainer
} from './styles';
import { Close } from '../Icons/Close';
import { formatCurrency } from '../../utils/formatCurrency';
import { API_URL } from '../../utils/api';
import { Button } from '../Button';

interface ProductModalProps {
	visible: boolean;
	onClose: () => void;
	product: null | Product;
	onAddToCart: (product: Product) => void
}

export function ProductModal({ visible, product, onClose, onAddToCart }: ProductModalProps) {
	if (!product) {
		return null;
	}

	function handleAddToCart() {
		onAddToCart(product!);
		onClose();
	}

	return (
		<Modal
			visible={visible}
			animationType='slide'
			presentationStyle='pageSheet'
			onRequestClose={onClose}
		>
			<Image
				source={{
					uri: `${API_URL}/uploads/${product.imagePath}`
				}}
			>
				<CloseButton onPress={onClose}>
					<Close />
				</CloseButton>
			</Image>

			<ModalBody>
				<Header>
					<Text size={24} weight="600">
						{product.name}
					</Text>
					<Text color="#666" style={{ marginTop: 8 }}>
						{product.description}
					</Text>
				</Header>

				{product.ingredients.length > 0 && (
					<IngredientsContainer>
						<Text weight="600" color="#666">Ingredientes</Text>

						<FlatList
							data={product.ingredients}
							keyExtractor={ingredient => ingredient._id}
							showsVerticalScrollIndicator={false}
							style={{ marginTop: 16 }}
							renderItem={({item: ingredient}) => (
								<Ingredients>
									<Text>{ingredient.icon}</Text>
									<Text
										size={14}
										color="#666"
										style={{ marginLeft: 20 }}
									>{ingredient.name}</Text>
								</Ingredients>
							)}
						/>
					</IngredientsContainer>
				)}
			</ModalBody>

			<Footer>
				<FooterContainer>
					<PriceContainer>
						<Text color="#666">Preço</Text>
						<Text size={20} weight="600">{formatCurrency(product.price)}</Text>
					</PriceContainer>

					<Button onPress={handleAddToCart}>
						Adicionar ao pedido
					</Button>
				</FooterContainer>
			</Footer>
		</Modal>
	);
}
