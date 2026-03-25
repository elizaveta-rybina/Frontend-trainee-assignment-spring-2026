import {
	skipToken,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { adsApi } from '../api'
import type { GetAdsParams, UpdateAdPayload } from '../model/types'

export const adsKeys = {
	all: ['ads'] as const,
	lists: () => [...adsKeys.all, 'list'] as const,
	list: (params: GetAdsParams) => [...adsKeys.lists(), params] as const,
	details: () => [...adsKeys.all, 'detail'] as const,
	detail: (id?: number) => [...adsKeys.details(), id] as const
}

export const useAds = (params: GetAdsParams) => {
	return useQuery({
		queryKey: adsKeys.list(params),
		queryFn: ({ signal }) => adsApi.getAds(params, signal)
	})
}

export const useAd = (id: number | undefined) => {
	return useQuery({
		queryKey: adsKeys.detail(id),
		queryFn: id ? ({ signal }) => adsApi.getAdById(id, signal) : skipToken
	})
}

export const useUpdateAd = (id: number) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (payload: UpdateAdPayload) => adsApi.updateAd(id, payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: adsKeys.detail(id) })
			await queryClient.invalidateQueries({ queryKey: adsKeys.lists() })

			await queryClient.refetchQueries({
				queryKey: adsKeys.detail(id),
				type: 'all'
			})
			await queryClient.refetchQueries({
				queryKey: adsKeys.lists(),
				type: 'all'
			})
		}
	})
}
