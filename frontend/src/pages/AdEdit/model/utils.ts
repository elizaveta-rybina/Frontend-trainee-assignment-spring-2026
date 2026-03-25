import type { SxProps, Theme } from '@mui/material'

import type { UpdateAdPayload } from '@/modules/ads/model/types'

import type { EditableParamValue } from './types'

export const warningInputSx: SxProps<Theme> = {
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940'
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940'
	}
}

export const aiButtonStyles: SxProps<Theme> = {
	bgcolor: '#F9F1E6',
	color: '#FFA940',
	textTransform: 'none',
	borderRadius: 2,
	boxShadow: 'none',
	'&:hover': { bgcolor: '#f4e5d3', boxShadow: 'none' },
	ml: 2,
	height: '40px'
}

const normalizeParams = (params: UpdateAdPayload['params']) => {
	const entries = Object.entries(params as Record<string, EditableParamValue>)
	const normalizedEntries = entries.filter(([, value]) => {
		if (value === undefined) return false
		if (typeof value === 'string') return value.trim() !== ''
		if (typeof value === 'number') return Number.isFinite(value)
		return false
	})

	return Object.fromEntries(normalizedEntries) as UpdateAdPayload['params']
}

export const normalizePayload = (
	payload: UpdateAdPayload
): UpdateAdPayload => ({
	...payload,
	title: payload.title.trim(),
	description: payload.description?.trim() ?? '',
	params: normalizeParams(payload.params)
})
