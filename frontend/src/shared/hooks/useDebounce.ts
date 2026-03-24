import { useEffect, useState } from 'react'

// Файл для того, чтобы приложение ждало пока пользователь закончит действие, прежде чем реагировать (для поиска)

export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler) // функция очистки, чтобы убить старый таймер и процесс начался заново
		}
	}, [value, delay])

	return debouncedValue
}
