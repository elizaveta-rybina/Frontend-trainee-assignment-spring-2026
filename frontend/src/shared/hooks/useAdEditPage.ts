import { useEffect, useMemo, useState } from 'react'
import type { NavigateFunction } from 'react-router-dom'

import { aiApi } from '@/modules/ads/api/ai'
import type { UpdateAdPayload } from '@/modules/ads/model/types'
import { useAd, useUpdateAd } from '@/modules/ads/query/hooks'
import { useDraftStore } from '@/shared/store/draftStore'

import { CATEGORY_FIELDS } from '@/pages/AdEdit/model/constants'
import type { AIState, ToastState } from '@/pages/AdEdit/model/types'
import { normalizePayload } from '@/pages/AdEdit/model/utils'

type UseAdEditPageParams = {
	numericId: number
	isInvalidId: boolean
	navigate: NavigateFunction
}

export const useAdEditPage = ({
	numericId,
	isInvalidId,
	navigate
}: UseAdEditPageParams) => {
	const { data: ad, isLoading: isFetching } = useAd(numericId)
	const { mutateAsync: updateAd, isPending: isSaving } = useUpdateAd(numericId)

	const [formData, setFormData] = useState<UpdateAdPayload | null>(null)
	const { drafts, setDraft, clearDraft } = useDraftStore()

	const [toast, setToast] = useState<ToastState>({
		open: false,
		type: 'success',
		message: ''
	})

	const [priceAi, setPriceAi] = useState<AIState>({
		status: 'idle',
		result: '',
		anchorEl: null
	})
	const [descAi, setDescAi] = useState<AIState>({
		status: 'idle',
		result: '',
		anchorEl: null
	})

	useEffect(() => {
		if (!ad) return

		const savedDraft = drafts[numericId.toString()]
		if (savedDraft) {
			setFormData(savedDraft)
			return
		}

		setFormData({
			category: ad.category,
			title: ad.title,
			price: ad.price ?? 0,
			description: ad.description || '',
			params: { ...ad.params } as UpdateAdPayload['params']
		})
	}, [ad, drafts, numericId])

	useEffect(() => {
		if (!formData) return
		setDraft(numericId.toString(), formData)
	}, [formData, numericId, setDraft])

	const handleChange = <K extends keyof UpdateAdPayload>(
		field: K,
		value: UpdateAdPayload[K]
	) => {
		setFormData(prev => (prev ? { ...prev, [field]: value } : null))
	}

	const handleParamChange = (
		paramName: string,
		value: string | number | undefined
	) => {
		setFormData(prev => {
			if (!prev) return null
			return {
				...prev,
				params: {
					...prev.params,
					[paramName]: value
				} as UpdateAdPayload['params']
			}
		})
	}

	const handleClearTitle = () => handleChange('title', '')
	const handleClearPrice = () => handleChange('price', null)
	const handleClearParam = (paramName: string) =>
		handleParamChange(paramName, undefined)

	const handlePriceAiRequest = async (e: React.MouseEvent<HTMLElement>) => {
		if (!formData) return
		setPriceAi({ status: 'loading', result: '', anchorEl: e.currentTarget })
		try {
			const result = await aiApi.generatePrice(formData)
			setPriceAi(prev => ({ ...prev, status: 'success', result }))
		} catch {
			setPriceAi(prev => ({ ...prev, status: 'error', result: '' }))
		}
	}

	const handlePriceApply = () => {
		const text = priceAi.result.toLowerCase()
		const multiplierMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(тыс|млн|миллион)/)

		if (multiplierMatch) {
			const num = parseFloat(multiplierMatch[1].replace(',', '.'))
			const multiplier = multiplierMatch[2].startsWith('тыс') ? 1000 : 1000000
			handleChange('price', Math.round(num * multiplier))
		} else {
			const textWithoutSpaces = text.replace(/[\s,]/g, '')
			const match =
				textWithoutSpaces.match(/\d{4,}/) || textWithoutSpaces.match(/\d+/)

			if (match) {
				handleChange('price', parseInt(match[0], 10))
			}
		}

		setPriceAi(prev => ({ ...prev, anchorEl: null }))
	}

	const handlePriceAiClose = () => {
		setPriceAi(prev => ({ ...prev, anchorEl: null }))
	}

	const handleDescAiRequest = async (e: React.MouseEvent<HTMLElement>) => {
		if (!formData) return
		setDescAi({ status: 'loading', result: '', anchorEl: e.currentTarget })
		try {
			const result = await aiApi.generateDescription(formData)
			setDescAi(prev => ({ ...prev, status: 'success', result }))
		} catch {
			setDescAi(prev => ({ ...prev, status: 'error', result: '' }))
		}
	}

	const handleDescApply = () => {
		handleChange('description', descAi.result.trim())
		setDescAi(prev => ({ ...prev, anchorEl: null }))
	}

	const handleDescAiClose = () => {
		setDescAi(prev => ({ ...prev, anchorEl: null }))
	}

	const isTitleMissing = !formData?.title
	const isPriceMissing =
		formData?.price === undefined || formData?.price === null
	const isSaveDisabled =
		isTitleMissing || isPriceMissing || isSaving || isInvalidId

	const handleSave = async () => {
		if (!formData || isSaveDisabled) return

		const payload = normalizePayload(formData)
		if (!payload.title) {
			setToast({
				open: true,
				type: 'error',
				message: 'Название не может быть пустым.'
			})
			return
		}

		try {
			await updateAd(payload)
			clearDraft(numericId.toString())
			setToast({ open: true, type: 'success', message: 'Изменения сохранены' })
			setTimeout(() => navigate(`/ads/${numericId}`), 1500)
		} catch {
			setToast({
				open: true,
				type: 'error',
				message:
					'При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.'
			})
		}
	}

	const fieldsConfig = useMemo(
		() =>
			formData
				? CATEGORY_FIELDS[formData.category as keyof typeof CATEGORY_FIELDS] ||
					[]
				: [],
		[formData]
	)

	const closeToast = () => {
		setToast(prev => ({ ...prev, open: false }))
	}

	return {
		formData,
		isFetching,
		isSaving,
		priceAi,
		descAi,
		toast,
		fieldsConfig,
		isTitleMissing,
		isPriceMissing,
		isSaveDisabled,
		handleChange,
		handleParamChange,
		handleClearTitle,
		handleClearPrice,
		handleClearParam,
		handlePriceAiRequest,
		handlePriceApply,
		handlePriceAiClose,
		handleDescAiRequest,
		handleDescApply,
		handleDescAiClose,
		handleSave,
		closeToast
	}
}
