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
import * as styles from './styles'

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
	const isGridView = view === 'grid'

	return (
		<Container maxWidth='xl' sx={styles.pageSx}>
			<AdsControlPanel
				total={data?.total || 0}
				searchValue={searchInput}
				onSearchChange={handleSearchChange}
				sortValue={sortValue}
				onSortChange={handleSortChange}
			/>

			<Box sx={styles.layoutSx}>
				<Box sx={styles.filtersColumnSx}>
					<Filters
						selectedCategories={selectedCategories}
						onChangeCategories={handleCategoriesChange}
						needsRevision={needsRevision}
						onChangeNeedsRevision={handleNeedsRevisionChange}
						onReset={handleResetFilters}
					/>
				</Box>

				<Box sx={styles.contentColumnSx}>
					{isLoading && (
						<Box sx={styles.loadingSx}>
							<CircularProgress />
						</Box>
					)}

					{isError && (
						<Box sx={styles.errorSx}>
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
								<Box sx={styles.emptySx}>
									<Typography variant='h6' color='text.secondary'>
										По вашему запросу ничего не найдено
									</Typography>
								</Box>
							) : (
								<Box sx={styles.cardsGridSx(isGridView)}>
									{data.items.map(ad => (
										<AdCard key={ad.id} {...ad} view={view} />
									))}
								</Box>
							)}
						</>
					)}

					{totalPages > 1 && (
						<Box sx={styles.paginationWrapSx}>
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
