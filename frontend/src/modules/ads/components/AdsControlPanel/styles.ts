import type { SxProps, Theme } from '@mui/material'

export const rootSx: SxProps<Theme> = { mb: 4 }

export const headerSx: SxProps<Theme> = { mb: 3 }

export const controlPanelSx: SxProps<Theme> = {
	p: 1.5,
	display: 'flex',
	gap: 2,
	alignItems: 'center',
	border: '1px solid',
	borderColor: 'divider',
	borderRadius: 2
}

export const searchBoxSx: SxProps<Theme> = {
	flexGrow: 1,
	display: 'flex',
	alignItems: 'center',
	bgcolor: 'action.hover',
	borderRadius: 1.5,
	px: 2,
	py: 0.5
}

export const searchInputSx: SxProps<Theme> = {
	flexGrow: 1,
	ml: 1
}

export const viewToggleSx: SxProps<Theme> = {
	height: 40
}

export const sortSelectSx: SxProps<Theme> = {
	height: 40,
	minWidth: 240
}
