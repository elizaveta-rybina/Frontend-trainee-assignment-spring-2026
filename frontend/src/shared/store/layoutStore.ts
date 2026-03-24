import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ViewLayout = 'grid' | 'list'

interface LayoutState {
	view: ViewLayout
	setView: (view: ViewLayout) => void
}

// Хранилище Zustant для сетки/списка, с сохранением в localStorage

export const useLayoutStore = create<LayoutState>()(
	persist( // автоматически сохраняет и восстанавливает состояние из localStorage
		set => ({
			view: 'grid',
			setView: view => set({ view })
		}),
		{ name: 'app-layout-storage' }
	)
)
