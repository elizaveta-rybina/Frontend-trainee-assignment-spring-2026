import type { SxProps, Theme } from '@mui/material'

export const rootSx: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
	minWidth: 280
}

export const mainPaperSx: SxProps<Theme> = {
	p: 2,
	borderRadius: 2,
	border: '1px solid',
	borderColor: 'divider'
}

export const titleSx: SxProps<Theme> = {
	mb: 2
}

export const accordionSx: SxProps<Theme> = {
	'&:before': { display: 'none' }
}

export const accordionSummarySx: SxProps<Theme> = {
	px: 0,
	minHeight: '48px',
	'& .MuiAccordionSummary-content': { my: 0 }
}

export const accordionDetailsSx: SxProps<Theme> = {
	px: 0,
	pt: 0
}

export const checkboxSx: SxProps<Theme> = {
	color: 'divider',
	'&.Mui-checked': { color: 'primary.main' }
}

export const optionLabelSx: SxProps<Theme> = {
	mb: 0.5
}

export const dividerSx: SxProps<Theme> = {
	my: 2
}

export const revisionRowSx: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center'
}

export const revisionTextSx: SxProps<Theme> = {
	maxWidth: '60%'
}

export const resetPaperSx: SxProps<Theme> = {
	borderRadius: 2,
	border: '1px solid',
	borderColor: 'divider'
}

export const resetButtonSx: SxProps<Theme> = {
	py: 1.5,
	color: 'text.secondary',
	textTransform: 'none',
	fontSize: '1rem',
	'&:hover': {
		backgroundColor: 'action.hover'
	}
}
