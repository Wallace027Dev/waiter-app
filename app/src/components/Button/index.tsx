import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps {
	children: string;
	disabled?: boolean;
	loading?: boolean;
	onPress: () => void;
}

export function Button({ children, disabled, loading, onPress }: ButtonProps) {
	return (
		<Container onPress={onPress} disabled={disabled || loading}>
			{!loading ? (
				<Text weight="600" color="#fff">
					{children}
				</Text>
			) : (
				<ActivityIndicator color="#fff" />
			)}
		</Container>
	);
}
