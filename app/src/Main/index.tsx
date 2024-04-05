import { useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContiner } from './styles';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectTable] = useState('');

	function handleSaveTable(table: string) {
		setSelectTable(table);
	}

	return(
		<>
			<Container>
				<Header />

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
