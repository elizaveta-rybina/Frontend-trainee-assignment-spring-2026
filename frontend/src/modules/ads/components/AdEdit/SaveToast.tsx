import { Alert, AlertTitle, Snackbar, Typography } from '@mui/material'

import type { ToastState } from '../../../../pages/AdEdit/types'

type SaveToastProps = {
	toast: ToastState
	onClose: () => void
}

export const SaveToast = ({ toast, onClose }: SaveToastProps) => {
	return (
		<Snackbar
			open={toast.open}
			autoHideDuration={toast.type === 'success' ? 4000 : 6000}
			onClose={onClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			sx={{ mt: 7 }}
		>
			<Alert
				onClose={onClose}
				severity={toast.type}
				sx={{
					width: '100%',
					maxWidth: '400px',
					alignItems: 'flex-start',
					bgcolor: toast.type === 'success' ? '#f6ffed' : '#fff2f0',
					border: '1px solid',
					borderColor: toast.type === 'success' ? '#b7eb8f' : '#ffccc7',
					color: 'rgba(0, 0, 0, 0.85)',
					boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
					'& .MuiAlert-icon': {
						color: toast.type === 'success' ? '#52c41a' : '#ff4d4f',
						mt: toast.type === 'error' ? 0.5 : 0
					}
				}}
			>
				{toast.type === 'error' && (
					<AlertTitle sx={{ fontWeight: 600, fontSize: '1rem', mb: 1 }}>
						Ошибка сохранения
					</AlertTitle>
				)}
				<Typography variant='body2' sx={{ lineHeight: 1.5 }}>
					{toast.message}
				</Typography>
			</Alert>
		</Snackbar>
	)
}
