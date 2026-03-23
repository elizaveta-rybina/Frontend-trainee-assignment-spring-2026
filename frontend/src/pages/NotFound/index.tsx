import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const NotFound = () => {
	return (
		<Container sx={{ mt: 10, textAlign: 'center' }}>
			<Typography variant='h1' color='error' gutterBottom>
				404
			</Typography>
			<Typography variant='h5' gutterBottom>
				Страница не найдена
			</Typography>
			<Button component={Link} to='/ads' variant='contained' sx={{ mt: 3 }}>
				Вернуться на главную
			</Button>
		</Container>
	)
}
