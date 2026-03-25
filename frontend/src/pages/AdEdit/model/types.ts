import type { ItemCategory, UpdateAdPayload } from '@/modules/ads/model/types'

export type SelectFieldConfig = {
	name: string
	label: string
	isSelect: true
	options: Array<{ value: string; label: string }>
	type?: never
}

export type InputFieldConfig = {
	name: string
	label: string
	isSelect: false
	type?: 'text' | 'number'
	options?: never
}

export type FieldConfig = SelectFieldConfig | InputFieldConfig

export type EditableParamValue = string | number | undefined

export type CategoryFieldsMap = Record<ItemCategory, FieldConfig[]>

export type AIState = {
	status: 'idle' | 'loading' | 'success' | 'error'
	result: string
	anchorEl: HTMLElement | null
}

export type ToastState = {
	open: boolean
	type: 'success' | 'error'
	message: string
}

export type AdEditFormData = UpdateAdPayload
