import type { SxProps, Theme } from '@mui/material'
import { Box, Button, Popover, TextField, Typography } from '@mui/material'

import { PriceAiRequestButton } from '@/modules/ads/components/AdEdit/PriceAiRequestButton'
import type { AIState } from '@/pages/AdEdit/types'
import * as styles from './styles'

type DescriptionSectionProps = {
	description: string
	aiButtonStyles: SxProps<Theme>
	onDescriptionChange: (value: string) => void
	descAi: AIState
	onDescAiRequest: (e: React.MouseEvent<HTMLElement>) => Promise<void>
	onDescApply: () => void
	onDescAiClose: () => void
}

export const DescriptionSection = ({
	description,
	aiButtonStyles,
	onDescriptionChange,
	descAi,
	onDescAiRequest,
	onDescApply,
	onDescAiClose
}: DescriptionSectionProps) => {
	const isDescPopoverOpen =
		Boolean(descAi.anchorEl) && descAi.status !== 'loading'

	return (
		<Box>
			<Typography variant='subtitle2' sx={styles.fieldLabelSx}>
				Описание
			</Typography>
			<TextField
				multiline
				rows={4}
				sx={styles.descriptionInputSx}
				value={description}
				onChange={e => onDescriptionChange(e.target.value)}
				placeholder='Опишите ваш товар...'
			/>
			<Box sx={styles.descriptionActionsRowSx}>
				<Box>
					<PriceAiRequestButton
						status={descAi.status}
						aiButtonStyles={aiButtonStyles}
						onClick={onDescAiRequest}
						idleLabel={description ? 'Улучшить описание' : 'Придумать описание'}
						loadingLabel='Выполняется запрос...'
						repeatLabel='Повторить запрос'
						disabledWhileLoading
						removeLeftMargin
					/>

					<Popover
						open={isDescPopoverOpen}
						anchorEl={descAi.anchorEl}
						onClose={onDescAiClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						transformOrigin={{ vertical: 'top', horizontal: 'left' }}
						slotProps={{
							paper: {
								sx:
									descAi.status === 'error'
										? styles.descPopoverErrorPaperSx
										: styles.descPopoverDefaultPaperSx
							}
						}}
					>
						{descAi.status === 'error' ? (
							<>
								<Typography
									variant='subtitle2'
									color='#cf1322'
									fontWeight={600}
									sx={styles.descPopoverErrorTitleSx}
								>
									Произошла ошибка при запросе к AI
								</Typography>
								<Typography
									variant='body2'
									sx={styles.descPopoverErrorMessageSx}
								>
									Попробуйте повторить запрос или закройте уведомление
								</Typography>
								<Button
									variant='contained'
									size='small'
									onClick={onDescAiClose}
									sx={styles.popoverCloseButtonSx}
								>
									Закрыть
								</Button>
							</>
						) : (
							<>
								<Typography
									variant='subtitle2'
									fontWeight={600}
									sx={styles.descPopoverResponseTitleSx}
								>
									Ответ AI:
								</Typography>
								<Typography
									variant='body2'
									sx={styles.descPopoverResponseTextSx}
								>
									{descAi.result}
								</Typography>
								<Box sx={styles.descPopoverActionsRowSx}>
									<Button
										variant='contained'
										color='primary'
										size='small'
										onClick={onDescApply}
										sx={styles.popoverApplyButtonSx}
									>
										Применить
									</Button>
									<Button
										variant='outlined'
										color='inherit'
										size='small'
										onClick={onDescAiClose}
										sx={styles.popoverSecondaryButtonSx}
									>
										Закрыть
									</Button>
								</Box>
							</>
						)}
					</Popover>
				</Box>

				<Typography variant='caption' sx={styles.descriptionCounterSx}>
					{description.length} / 1000
				</Typography>
			</Box>
		</Box>
	)
}
