import { Box, Button, Container, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

export const AdView = () => {
	const { id } = useParams()

	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant='h4' gutterBottom>
				Просмотр объявления #{id}
			</Typography>
			<Typography variant='body1' color='text.secondary' paragraph>
				Здесь будет полная информация об объявлении и предупреждения о
				доработках.
			</Typography>

			<Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
				<Button
					component={Link}
					to={`/ads/${id}/edit`}
					variant='contained'
					color='secondary'
				>
					Редактировать
				</Button>
				<Button component={Link} to='/ads' variant='outlined'>
					Вернуться к списку
				</Button>
			</Box>
		</Container>
	)
}
