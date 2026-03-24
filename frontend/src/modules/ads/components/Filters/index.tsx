import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
	Paper,
	Switch,
	Typography
} from '@mui/material'
import { CATEGORY_OPTIONS } from '../../model/constants'
import type { ItemCategory } from '../../model/types'
import * as styles from './styles'

interface FiltersProps {
	selectedCategories: ItemCategory[]
	onChangeCategories: (categories: ItemCategory[]) => void
	needsRevision: boolean
	onChangeNeedsRevision: (value: boolean) => void
	onReset: () => void
}

export const Filters = ({
	selectedCategories,
	onChangeCategories,
	needsRevision,
	onChangeNeedsRevision,
	onReset
}: FiltersProps) => {
	// Переключатель категорий. Принимает категорию, вызывает onChangeCategories с обновленным массивом выбранных категорий
	const handleCategoryToggle = (category: ItemCategory) => {
		onChangeCategories(
			selectedCategories.includes(category)
				? selectedCategories.filter(item => item !== category)
				: [...selectedCategories, category]
		)
	}

	return (
		<Box sx={styles.rootSx}>
			<Paper elevation={0} sx={styles.mainPaperSx}>
				<Typography
					variant='h6'
					fontWeight={600}
					gutterBottom
					sx={styles.titleSx}
				>
					Фильтры
				</Typography>

				<Accordion
					disableGutters
					elevation={0}
					defaultExpanded
					sx={styles.accordionSx}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						sx={styles.accordionSummarySx}
					>
						<Typography>Категория</Typography>
					</AccordionSummary>
					<AccordionDetails sx={styles.accordionDetailsSx}>
						<FormGroup>
							{CATEGORY_OPTIONS.map(option => (
								<FormControlLabel
									key={option.value}
									control={
										<Checkbox
											checked={selectedCategories.includes(option.value)}
											onChange={() => handleCategoryToggle(option.value)}
											size='small'
											sx={styles.checkboxSx}
										/>
									}
									label={
										<Typography variant='body2'>{option.label}</Typography>
									}
									sx={styles.optionLabelSx}
								/>
							))}
						</FormGroup>
					</AccordionDetails>
				</Accordion>

				<Divider sx={styles.dividerSx} />

				<Box sx={styles.revisionRowSx}>
					<Typography
						variant='body2'
						fontWeight={500}
						sx={styles.revisionTextSx}
					>
						Только требующие доработок
					</Typography>
					<Switch
						checked={needsRevision}
						onChange={e => onChangeNeedsRevision(e.target.checked)}
						color='primary'
					/>
				</Box>
			</Paper>

			<Paper elevation={0} sx={styles.resetPaperSx}>
				<Button fullWidth onClick={onReset} sx={styles.resetButtonSx}>
					Сбросить фильтры
				</Button>
			</Paper>
		</Box>
	)
}
