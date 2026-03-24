import axios from 'axios'

const apiBaseUrl =
	(globalThis as any).API_BASE_URL ||
	import.meta.env.VITE_API_BASE_URL ||
	(globalThis as any).process?.env?.API_BASE_URL ||
	(typeof window !== 'undefined' ? 'http://localhost:3000' : undefined)

export const apiClient = axios.create({
	baseURL: apiBaseUrl,
	headers: {
		'Content-Type': 'application/json'
	}
})
