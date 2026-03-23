import { apiClient } from '@/shared/api/client'
import type {
	AdDetails,
	AdListItem,
	GetAdsParams,
	UpdateAdPayload
} from '../model/types'

export const adsApi = {
	// GET /items
	getAds: async (params: GetAdsParams, signal?: AbortSignal) => {
		const { categories, ...restParams } = params
		const queryParams = {
			...restParams,
			categories: categories?.length ? categories.join(',') : undefined
		}

		const { data } = await apiClient.get<{
			items: AdListItem[]
			total: number
		}>('/items', {
			params: queryParams,
			signal // Abort signal
		})
		return data
	},

	// GET /items/:id
	getAdById: async (id: number, signal?: AbortSignal) => {
		const { data } = await apiClient.get<AdDetails>(`/items/${id}`, { signal })
		return data
	},

	// PUT /items/:id
	updateAd: async (id: number, payload: UpdateAdPayload) => {
		const { data } = await apiClient.put<{ success: boolean }>(
			`/items/${id}`,
			payload
		)
		return data
	}
}
