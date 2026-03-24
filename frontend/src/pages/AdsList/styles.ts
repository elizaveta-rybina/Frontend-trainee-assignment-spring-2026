import type { SxProps, Theme } from '@mui/material'

export const pageSx: SxProps<Theme> = {
	py: 4
}

export const layoutSx: SxProps<Theme> = {
	display: 'flex',
	gap: 4,
	flexDirection: { xs: 'column', md: 'row' }
}

export const filtersColumnSx: SxProps<Theme> = {
	width: { xs: '100%', md: 280 },
	flexShrink: 0
}

export const contentColumnSx: SxProps<Theme> = {
	flexGrow: 1,
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0
}

export const loadingSx: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	py: 8
}

export const errorSx: SxProps<Theme> = {
	textAlign: 'center',
	py: 8
}

export const emptySx: SxProps<Theme> = {
	textAlign: 'center',
	py: 8
}

export const cardsGridSx = (isGridView: boolean): SxProps<Theme> => ({
	display: 'grid',
	gridTemplateColumns: isGridView
		? {
				xs: '1fr',
				sm: 'repeat(2, 1fr)',
				md: 'repeat(3, 1fr)',
				lg: 'repeat(4, 1fr)',
				xl: 'repeat(5, 1fr)'
			}
		: '1fr',
	gap: 3
})

export const paginationWrapSx: SxProps<Theme> = {
	mt: 6,
	display: 'flex',
	justifyContent: 'flex-start'
}
