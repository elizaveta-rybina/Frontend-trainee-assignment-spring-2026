import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AdEdit } from '@/pages/AdEdit'
import { AdsList } from '@/pages/AdsList'
import { AdView } from '@/pages/AdView'
import { NotFound } from '@/pages/NotFound'

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate to='/ads' replace />} />
				<Route path='/ads' element={<AdsList />} />
				<Route path='/ads/:id' element={<AdView />} />
				<Route path='/ads/:id/edit' element={<AdEdit />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
