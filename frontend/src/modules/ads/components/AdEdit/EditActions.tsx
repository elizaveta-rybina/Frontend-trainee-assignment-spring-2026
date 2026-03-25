import { Box, Button, CircularProgress } from '@mui/material'

import * as styles from './styles'

type EditActionsProps = {
	isSaving: boolean
	isSaveDisabled: boolean
	onSave: () => void
	onCancel: () => void
}

export const EditActions = ({
	isSaving,
	isSaveDisabled,
	onSave,
	onCancel
}: EditActionsProps) => {
	return (
		<Box sx={styles.editActionsRowSx}>
			<Button
				variant='contained'
				color='primary'
				onClick={onSave}
				disabled={isSaveDisabled}
				sx={styles.editSaveButtonSx}
			>
				{isSaving ? (
					<CircularProgress size={20} sx={styles.editSaveSpinnerSx} />
				) : (
					'Сохранить'
				)}
			</Button>
			<Button
				variant='contained'
				onClick={onCancel}
				sx={styles.editCancelButtonSx}
			>
				Отменить
			</Button>
		</Box>
	)
}
