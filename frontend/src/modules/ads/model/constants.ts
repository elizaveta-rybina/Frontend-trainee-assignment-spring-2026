import type { ItemCategory } from './types'

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
	auto: 'Авто',
	real_estate: 'Недвижимость',
	electronics: 'Электроника'
}

// Массив объектов для селекта категорий в фильтрах
export const CATEGORY_OPTIONS: Array<{ value: ItemCategory; label: string }> = [
	{ value: 'auto', label: CATEGORY_LABELS.auto },
	{ value: 'electronics', label: CATEGORY_LABELS.electronics },
	{ value: 'real_estate', label: CATEGORY_LABELS.real_estate }
]
