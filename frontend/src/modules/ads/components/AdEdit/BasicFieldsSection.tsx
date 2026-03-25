import ClearIcon from '@mui/icons-material/Clear'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { SxProps, Theme } from '@mui/material'
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	MenuItem,
	Popover,
	Select,
	TextField,
	Typography
} from '@mui/material'

import type { AIState, AdEditFormData } from '@/pages/AdEdit/types'

import { PriceAiRequestButton } from '@/modules/ads/components/AdEdit/PriceAiRequestButton'
import * as styles from './styles'

type BasicFieldsSectionProps = {
	formData: AdEditFormData
	isTitleMissing: boolean
	isPriceMissing: boolean
	aiButtonStyles: SxProps<Theme>
	onTitleChange: (value: string) => void
	onPriceChange: (value: number | null) => void
	onClearTitle: () => void
	onClearPrice: () => void
	priceAi: AIState
	onPriceAiRequest: (e: React.MouseEvent<HTMLElement>) => Promise<void>
	onPriceApply: () => void
	onPriceAiClose: () => void
}

export const BasicFieldsSection = ({
	formData,
	isTitleMissing,
	isPriceMissing,
	aiButtonStyles,
	onTitleChange,
	onPriceChange,
	onClearTitle,
	onClearPrice,
	priceAi,
	onPriceAiRequest,
	onPriceApply,
	onPriceAiClose
}: BasicFieldsSectionProps) => {
	const isPricePopoverOpen =
		Boolean(priceAi.anchorEl) && priceAi.status !== 'loading'

	const renderRequiredLabel = (label: string) => (
		<>
			<span style={styles.requiredAsteriskStyle}>*</span> {label}
		</>
	)

	return (
		<>
			<Box>
				<Typography variant='subtitle2' sx={styles.fieldLabelSx}>
					Категория
				</Typography>
				<FormControl size='small' sx={styles.categoryFormControlSx} disabled>
					<Select
						IconComponent={KeyboardArrowDownIcon}
						value={formData.category}
						sx={styles.categorySelectSx}
					>
						<MenuItem value='electronics'>Электроника</MenuItem>
						<MenuItem value='auto'>Авто</MenuItem>
						<MenuItem value='real_estate'>Недвижимость</MenuItem>
					</Select>
				</FormControl>
			</Box>

			<Box sx={styles.sectionDividerSx} />

			<Box>
				<Typography
					variant='subtitle2'
					color={isTitleMissing ? 'error' : 'textPrimary'}
					sx={styles.fieldLabelSx}
				>
					{renderRequiredLabel('Название')}
				</Typography>
				<TextField
					size='medium'
					sx={
						isTitleMissing
							? ([
									styles.textInputSx,
									styles.refineInputBorderSx
								] as SxProps<Theme>)
							: styles.textInputSx
					}
					value={formData.title}
					onChange={e => onTitleChange(e.target.value)}
					error={false}
					InputProps={{
						endAdornment: formData.title && (
							<InputAdornment position='end'>
								<IconButton
									size='small'
									onClick={onClearTitle}
									sx={styles.clearIconButtonSx}
								>
									<ClearIcon sx={styles.clearIconSx} />
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</Box>

			<Box sx={styles.sectionDividerSx} />

			<Box>
				<Typography
					variant='subtitle2'
					color={isPriceMissing ? 'error' : 'textPrimary'}
					sx={styles.fieldLabelSx}
				>
					{renderRequiredLabel('Цена')}
				</Typography>
				<Box sx={styles.priceRowSx}>
					<TextField
						type='number'
						size='medium'
						sx={
							isPriceMissing
								? ([
										styles.textInputSx,
										styles.refineInputBorderSx
									] as SxProps<Theme>)
								: styles.textInputSx
						}
						value={formData.price ?? ''}
						onChange={e =>
							onPriceChange(
								e.target.value === '' ? null : Number(e.target.value)
							)
						}
						error={false}
						InputProps={{
							endAdornment: formData.price !== null && (
								<InputAdornment position='end'>
									<IconButton
										size='small'
										onClick={onClearPrice}
										sx={styles.clearIconButtonSx}
									>
										<ClearIcon sx={styles.clearIconSx} />
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					<PriceAiRequestButton
						status={priceAi.status}
						aiButtonStyles={aiButtonStyles}
						onClick={onPriceAiRequest}
						idleLabel='Узнать рыночную цену'
						loadingLabel='Выполняется запрос'
						repeatLabel='Повторить запрос'
					/>

					<Popover
						open={isPricePopoverOpen}
						anchorEl={priceAi.anchorEl}
						onClose={onPriceAiClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						transformOrigin={{ vertical: 'top', horizontal: 'left' }}
						slotProps={{
							paper: {
								sx:
									priceAi.status === 'error'
										? styles.popoverErrorPaperSx
										: styles.popoverDefaultPaperSx
							}
						}}
					>
						{priceAi.status === 'error' ? (
							<>
								<Typography
									variant='subtitle2'
									color='#cf1322'
									fontWeight={600}
									sx={{ mb: 1 }}
								>
									Произошла ошибка при запросе к AI
								</Typography>
								<Typography
									variant='body2'
									sx={{ mb: 2, color: 'text.primary' }}
								>
									Попробуйте повторить запрос или закройте уведомление
								</Typography>
								<Button
									variant='contained'
									size='small'
									onClick={onPriceAiClose}
									sx={styles.popoverCloseButtonSx}
								>
									Закрыть
								</Button>
							</>
						) : (
							<>
								<Typography variant='subtitle2' fontWeight={600} sx={{ mb: 1 }}>
									Ответ AI:
								</Typography>
								<Typography
									variant='body2'
									sx={{ mb: 2, whiteSpace: 'pre-wrap' }}
								>
									{priceAi.result}
								</Typography>
								<Box sx={{ display: 'flex', gap: 1 }}>
									<Button
										variant='contained'
										color='primary'
										size='small'
										onClick={onPriceApply}
										sx={styles.popoverApplyButtonSx}
									>
										Применить
									</Button>
									<Button
										variant='outlined'
										color='inherit'
										size='small'
										onClick={onPriceAiClose}
										sx={styles.popoverSecondaryButtonSx}
									>
										Закрыть
									</Button>
								</Box>
							</>
						)}
					</Popover>
				</Box>
			</Box>

			<Box sx={styles.sectionDividerSx} />
		</>
	)
}
