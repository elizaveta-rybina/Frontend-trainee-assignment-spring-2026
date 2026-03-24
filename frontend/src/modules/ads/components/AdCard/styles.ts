import type { SxProps, Theme } from '@mui/material'

export const cardSx: SxProps<Theme> = {
	border: '1px solid',
	borderColor: 'divider',
	borderRadius: 3,
	height: '100%'
}

export const actionAreaSx = (isList: boolean): SxProps<Theme> => ({
	height: '100%',
	display: 'flex',
	flexDirection: isList ? 'row' : 'column',
	alignItems: 'stretch',
	justifyContent: 'flex-start'
})

export const imageBoxSx = (isList: boolean): SxProps<Theme> => ({
	width: isList ? { xs: 140, sm: 220 } : '100%',
	flexShrink: 0,
	aspectRatio: isList ? 'auto' : '4 / 3',
	bgcolor: 'grey.50',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRight: isList ? '1px solid' : 'none',
	borderBottom: isList ? 'none' : '1px solid',
	borderColor: 'divider'
})

export const cardContentSx: SxProps<Theme> = {
	p: 2,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
	flexGrow: 1
}

export const categoryChipSx: SxProps<Theme> = {
	alignSelf: 'flex-start',
	color: 'text.secondary',
	borderRadius: 1.5
}

export const titleSx: SxProps<Theme> = {
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	lineHeight: 1.2,
	mt: 0.5
}

export const priceSx: SxProps<Theme> = {
	color: 'text.primary',
	mb: 0.5
}

export const revisionBadgeSx: SxProps<Theme> = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: 0.75,
	bgcolor: '#fff8e1',
	color: '#f57c00',
	px: 1.5,
	py: 0.5,
	borderRadius: 1.5,
	alignSelf: 'flex-start',
	mt: 'auto'
}

export const revisionDotSx: SxProps<Theme> = {
	width: 6,
	height: 6,
	borderRadius: '50%',
	bgcolor: '#f57c00'
}
