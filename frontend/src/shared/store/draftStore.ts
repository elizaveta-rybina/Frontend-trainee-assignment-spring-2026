import type { UpdateAdPayload } from '@/modules/ads/model/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DraftState {
	drafts: Record<string, UpdateAdPayload>
	setDraft: (id: string, data: UpdateAdPayload) => void
	clearDraft: (id: string) => void
}

export const useDraftStore = create<DraftState>()(
	persist(
		set => ({
			drafts: {},
			setDraft: (id, data) =>
				set(state => ({ drafts: { ...state.drafts, [id]: data } })),
			clearDraft: id => {
				set(state => {
					const newDrafts = { ...state.drafts }
					delete newDrafts[id]
					return { drafts: newDrafts }
				})
			}
		}),
		{ name: 'ad-draft-storage' }
	)
)
