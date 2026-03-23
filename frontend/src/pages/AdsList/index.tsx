import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const AdsList = () => {
	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant='h4' gutterBottom>
				Мои объявления
			</Typography>
			<Typography variant='body1' color='text.secondary'>
				Здесь будет список из 6 повторяющихся карточек, фильтры и пагинация.
			</Typography>

			<Box sx={{ mt: 2 }}>
				<Button component={Link} to='/ads/123' variant='contained'>
					Тест: Открыть объявление #123
				</Button>
			</Box>
		</Container>
	)
}
