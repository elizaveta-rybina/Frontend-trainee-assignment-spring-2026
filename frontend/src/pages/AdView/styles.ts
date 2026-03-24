import type { SxProps, Theme } from '@mui/material'

export const loadingSx: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	py: 8
}

export const errorContainerSx: SxProps<Theme> = {
	py: 8,
	textAlign: 'center'
}

export const errorButtonSx: SxProps<Theme> = {
	mt: 2
}

export const pageSx: SxProps<Theme> = {
	py: 4
}

export const backButtonSx: SxProps<Theme> = {
	mb: 2,
	textTransform: 'none'
}

export const titleRowSx: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-start',
	mb: 2
}

export const titleSx: SxProps<Theme> = {
	pr: 2
}

export const priceSx: SxProps<Theme> = {
	whiteSpace: 'nowrap'
}

export const headerActionsRowSx: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-end',
	mb: 4
}

export const editButtonSx: SxProps<Theme> = {
	textTransform: 'none',
	borderRadius: 2,
	px: 3
}

export const datesSx: SxProps<Theme> = {
	textAlign: 'right',
	color: 'text.secondary'
}

export const imageBoxSx: SxProps<Theme> = {
	width: '100%',
	aspectRatio: '4 / 3',
	bgcolor: 'grey.100',
	borderRadius: 2,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	mb: 4
}

export const descriptionSx = (hasDescription: boolean): SxProps<Theme> => ({
	whiteSpace: 'pre-wrap',
	color: hasDescription ? 'text.primary' : 'text.secondary'
})

export const revisionPaperSx: SxProps<Theme> = {
	bgcolor: '#fdf4e7',
	borderRadius: 2,
	p: 3,
	mb: 4,
	display: 'flex',
	gap: 2,
	alignItems: 'flex-start'
}

export const revisionIconSx: SxProps<Theme> = {
	color: '#f57c00',
	mt: 0.5
}

export const revisionTitleSx: SxProps<Theme> = {
	mb: 1
}

export const revisionTextSx: SxProps<Theme> = {
	mb: 1
}

export const missingListSx: SxProps<Theme> = {
	m: 0,
	pl: 2,
	typography: 'body2'
}

export const specsWrapSx: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1.5,
	mt: 2
}

export const specRowSx: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	borderBottom: '1px solid',
	borderColor: 'divider',
	pb: 1
}
