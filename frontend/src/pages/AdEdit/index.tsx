import { Box, Button, Container, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

export const AdEdit = () => {
	const { id } = useParams()

	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant='h4' gutterBottom>
				AdE
			</Typography>
			<Typography variant='body1' color='text.secondary'>
				Здесь будет сложная форма, AI-генерация описания и оценка цены.
			</Typography>

			<Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
				<Button variant='contained' color='success'>
					Сохранить (пока ничего не делает)
				</Button>
				<Button component={Link} to={`/ads/${id}`} variant='text' color='error'>
					Отменить
				</Button>
			</Box>
		</Container>
	)
}
