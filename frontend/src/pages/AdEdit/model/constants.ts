import type { CategoryFieldsMap } from './types'

export const CATEGORY_FIELDS: CategoryFieldsMap = {
	electronics: [
		{
			name: 'type',
			label: 'Тип',
			isSelect: true,
			options: [
				{ value: 'phone', label: 'Телефон' },
				{ value: 'laptop', label: 'Ноутбук' },
				{ value: 'misc', label: 'Другое' }
			]
		},
		{ name: 'brand', label: 'Бренд', isSelect: false },
		{ name: 'model', label: 'Модель', isSelect: false },
		{ name: 'color', label: 'Цвет', isSelect: false },
		{
			name: 'condition',
			label: 'Состояние',
			isSelect: true,
			options: [
				{ value: 'new', label: 'Новое' },
				{ value: 'used', label: 'Б/У' }
			]
		}
	],
	auto: [
		{ name: 'brand', label: 'Марка', isSelect: false },
		{ name: 'model', label: 'Модель', isSelect: false },
		{
			name: 'yearOfManufacture',
			label: 'Год выпуска',
			isSelect: false,
			type: 'number'
		},
		{
			name: 'transmission',
			label: 'Коробка передач',
			isSelect: true,
			options: [
				{ value: 'automatic', label: 'Автомат' },
				{ value: 'manual', label: 'Механика' }
			]
		},
		{ name: 'mileage', label: 'Пробег', isSelect: false, type: 'number' },
		{
			name: 'enginePower',
			label: 'Мощность двигателя',
			isSelect: false,
			type: 'number'
		}
	],
	real_estate: [
		{
			name: 'type',
			label: 'Тип объекта',
			isSelect: true,
			options: [
				{ value: 'flat', label: 'Квартира' },
				{ value: 'house', label: 'Дом' },
				{ value: 'room', label: 'Комната' }
			]
		},
		{ name: 'address', label: 'Адрес', isSelect: false },
		{ name: 'area', label: 'Площадь', isSelect: false, type: 'number' },
		{ name: 'floor', label: 'Этаж', isSelect: false, type: 'number' }
	]
}
