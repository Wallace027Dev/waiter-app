import { Header } from '../components/Header';

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContiner } from './styles';

export function Main() {
	return(
		<>
			<Container>
				<Header />

				<CategoriesContainer></CategoriesContainer>

				<MenuContainer></MenuContainer>

			</Container>

			<Footer>
				<FooterContiner></FooterContiner>
			</Footer>
		</>
	);
}
