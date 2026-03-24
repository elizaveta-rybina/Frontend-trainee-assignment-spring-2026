import { useLayoutStore } from '@/shared/store/layoutStore'
import GridViewIcon from '@mui/icons-material/GridView'
import SearchIcon from '@mui/icons-material/Search'
import ViewListIcon from '@mui/icons-material/ViewList'
import {
	Box,
	InputBase,
	MenuItem,
	Paper,
	Select,
	type SelectChangeEvent,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from '@mui/material'
import * as styles from './styles'

export type SortOption =
	| 'createdAt_desc'
	| 'createdAt_asc'
	| 'title_asc'
	| 'title_desc'

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
	{ value: 'createdAt_desc', label: 'По новизне (сначала новые)' },
	{ value: 'createdAt_asc', label: 'По новизне (сначала старые)' },
	{ value: 'title_asc', label: 'По алфавиту (А-Я)' },
	{ value: 'title_desc', label: 'По алфавиту (Я-А)' }
]

const getAdsCountLabel = (total: number) =>
	total === 1 ? 'объявление' : 'объявлений'

interface AdsControlPanelProps {
	total: number
	searchValue: string
	onSearchChange: (val: string) => void
	sortValue: SortOption
	onSortChange: (val: SortOption) => void
}

export const AdsControlPanel = ({
	total,
	searchValue,
	onSearchChange,
	sortValue,
	onSortChange
}: AdsControlPanelProps) => {
	const { view, setView } = useLayoutStore()

	// Первый аргумент - событие клика, второй - новое значение (или null, если кликнули по уже выбранной кнопке)
	const handleViewChange = (
		_: React.MouseEvent<HTMLElement>,
		newView: 'grid' | 'list' | null
	) => {
		if (newView !== null) {
			setView(newView)
		}
	}

	// Получаем событие от компонента Select, извлекаем новое значение сортировки и вызываем onSortChange
	const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
		onSortChange(event.target.value as SortOption)
	}

	return (
		<Box sx={styles.rootSx}>
			<Box sx={styles.headerSx}>
				<Typography variant='h4' fontWeight={600} gutterBottom>
					Мои объявления
				</Typography>
				<Typography variant='body1' color='text.secondary'>
					{total} {getAdsCountLabel(total)}
				</Typography>
			</Box>

			<Paper elevation={0} sx={styles.controlPanelSx}>
				<Box sx={styles.searchBoxSx}>
					<InputBase
						placeholder='Найти объявление....'
						value={searchValue}
						onChange={e => onSearchChange(e.target.value)}
						sx={styles.searchInputSx}
					/>
					<SearchIcon color='action' />
				</Box>

				<ToggleButtonGroup
					value={view}
					exclusive
					onChange={handleViewChange}
					size='small'
					sx={styles.viewToggleSx}
				>
					<ToggleButton value='grid' aria-label='grid view'>
						<GridViewIcon fontSize='small' />
					</ToggleButton>
					<ToggleButton value='list' aria-label='list view'>
						<ViewListIcon fontSize='small' />
					</ToggleButton>
				</ToggleButtonGroup>

				<Select
					value={sortValue}
					onChange={handleSortChange}
					size='small'
					sx={styles.sortSelectSx}
				>
					{SORT_OPTIONS.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</Paper>
		</Box>
	)
}
