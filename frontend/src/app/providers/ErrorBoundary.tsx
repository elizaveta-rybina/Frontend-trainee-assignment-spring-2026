import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Paper,
	Typography
} from '@mui/material'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
	children: ReactNode
}

interface State {
	hasError: boolean
	errorMsg: string
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false, errorMsg: '' }
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, errorMsg: error.message }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<Box
					sx={{
						minHeight: '100vh',
						display: 'grid',
						placeItems: 'center',
						p: 3,
						bgcolor: 'background.default'
					}}
				>
					<Paper elevation={3} sx={{ p: 3, maxWidth: 680, width: '100%' }}>
						<Alert severity='error' variant='outlined'>
							<AlertTitle>Что-то пошло не так</AlertTitle>
							<Typography variant='body2' sx={{ mb: 1.5 }}>
								Мы уже работаем над этим. Пожалуйста, перезагрузите страницу.
							</Typography>
							<details>
								<summary>Технические детали</summary>
								<Typography
									component='pre'
									sx={{ whiteSpace: 'pre-wrap', m: 0, mt: 1 }}
								>
									{this.state.errorMsg}
								</Typography>
							</details>
							<Button
								size='small'
								variant='contained'
								sx={{ mt: 2 }}
								onClick={() => window.location.reload()}
							>
								Перезагрузить страницу
							</Button>
						</Alert>
					</Paper>
				</Box>
			)
		}

		return this.props.children
	}
}
