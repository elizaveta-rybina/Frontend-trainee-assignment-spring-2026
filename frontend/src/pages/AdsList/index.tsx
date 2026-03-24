import {
	Box,
	Button,
	CircularProgress,
	Container,
	Pagination,
	Typography
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { AdCard } from '@/modules/ads/components/AdCard'
import {
	AdsControlPanel,
	type SortOption
} from '@/modules/ads/components/AdsControlPanel'
import { Filters } from '@/modules/ads/components/Filters'
import type { ItemCategory } from '@/modules/ads/model/types'
import { useAds } from '@/modules/ads/query/hooks'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useLayoutStore } from '@/shared/store/layoutStore'

export const AdsList = () => {
	const view = useLayoutStore(state => state.view)

	const limit = view === 'grid' ? 10 : 4

	const [searchInput, setSearchInput] = useState('')
	const debouncedSearch = useDebounce(searchInput, 500)
	const [selectedCategories, setSelectedCategories] = useState<ItemCategory[]>(
		[]
	)
	const [needsRevision, setNeedsRevision] = useState(false)
	const [sortValue, setSortValue] = useState<SortOption>('createdAt_desc')

	const [page, setPage] = useState(1)

	useEffect(() => {
		setPage(1)
	}, [view])

	const [sortColumn, sortDirection] = useMemo(() => {
		return sortValue.split('_') as ['createdAt' | 'title', 'asc' | 'desc']
	}, [sortValue])

	const { data, isLoading, isError, refetch } = useAds({
		q: debouncedSearch,
		categories: selectedCategories,
		needsRevision,
		sortColumn,
		sortDirection,
		limit,
		skip: (page - 1) * limit
	})

	const handleResetFilters = () => {
		setSearchInput('')
		setSelectedCategories([])
		setNeedsRevision(false)
		setSortValue('createdAt_desc')
		setPage(1)
	}

	const handlePageReset = () => setPage(1)

	const handleSearchChange = (value: string) => {
		setSearchInput(value)
		handlePageReset()
	}

	const handleSortChange = (value: SortOption) => {
		setSortValue(value)
		handlePageReset()
	}

	const handleCategoriesChange = (categories: ItemCategory[]) => {
		setSelectedCategories(categories)
		handlePageReset()
	}

	const handleNeedsRevisionChange = (value: boolean) => {
		setNeedsRevision(value)
		handlePageReset()
	}

	const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
		setPage(newPage)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const totalPages = data?.total ? Math.ceil(data.total / limit) : 0
	const hasItems = Boolean(data?.items?.length)
	const isEmpty = !isLoading && !isError && data?.items && !hasItems

	return (
		<Container maxWidth='xl' sx={{ py: 4 }}>
			<AdsControlPanel
				total={data?.total || 0}
				searchValue={searchInput}
				onSearchChange={handleSearchChange}
				sortValue={sortValue}
				onSortChange={handleSortChange}
			/>

			<Box
				sx={{
					display: 'flex',
					gap: 4,
					flexDirection: { xs: 'column', md: 'row' }
				}}
			>
				<Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
					<Filters
						selectedCategories={selectedCategories}
						onChangeCategories={handleCategoriesChange}
						needsRevision={needsRevision}
						onChangeNeedsRevision={handleNeedsRevisionChange}
						onReset={handleResetFilters}
					/>
				</Box>

				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
						minWidth: 0
					}}
				>
					{isLoading && (
						<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
							<CircularProgress />
						</Box>
					)}

					{isError && (
						<Box sx={{ textAlign: 'center', py: 8 }}>
							<Typography color='error' gutterBottom>
								Произошла ошибка при загрузке данных.
							</Typography>
							<Button variant='outlined' onClick={() => refetch()}>
								Попробовать снова
							</Button>
						</Box>
					)}

					{!isLoading && !isError && data?.items && (
						<>
							{isEmpty ? (
								<Box sx={{ textAlign: 'center', py: 8 }}>
									<Typography variant='h6' color='text.secondary'>
										По вашему запросу ничего не найдено
									</Typography>
								</Box>
							) : (
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns:
											view === 'grid'
												? {
														xs: '1fr',
														sm: 'repeat(2, 1fr)',
														md: 'repeat(3, 1fr)',
														lg: 'repeat(4, 1fr)',
														xl: 'repeat(5, 1fr)'
													}
												: '1fr',
										gap: 3
									}}
								>
									{data.items.map(ad => (
										<AdCard key={ad.id} {...ad} view={view} />
									))}
								</Box>
							)}
						</>
					)}

					{totalPages > 1 && (
						<Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-start' }}>
							<Pagination
								count={totalPages}
								page={page}
								onChange={handlePageChange}
								variant='outlined'
								shape='rounded'
								color='primary'
							/>
						</Box>
					)}
				</Box>
			</Box>
		</Container>
	)
}
