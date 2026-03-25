import type { AIState } from '@/pages/AdEdit/model/types'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import type { SxProps, Theme } from '@mui/material'
import { Button, CircularProgress } from '@mui/material'
import { priceAiAccentIconSx, priceAiButtonSx } from './styles'

type PriceAiRequestButtonProps = {
	status: AIState['status']
	aiButtonStyles: SxProps<Theme>
	onClick: (e: React.MouseEvent<HTMLElement>) => Promise<void>
	idleLabel: string
	loadingLabel: string
	repeatLabel: string
	disabledWhileLoading?: boolean
	removeLeftMargin?: boolean
}

export const PriceAiRequestButton = ({
	status,
	aiButtonStyles,
	onClick,
	idleLabel,
	loadingLabel,
	repeatLabel,
	disabledWhileLoading = false,
	removeLeftMargin = false
}: PriceAiRequestButtonProps) => {
	const isLoading = status === 'loading'
	const isRepeatState = status === 'success' || status === 'error'

	return (
		<Button
			variant='contained'
			disabled={disabledWhileLoading && isLoading}
			startIcon={
				isLoading ? (
					<CircularProgress size={14} sx={priceAiAccentIconSx} />
				) : isRepeatState ? (
					<RefreshIcon sx={priceAiAccentIconSx} />
				) : (
					<LightbulbOutlinedIcon sx={priceAiAccentIconSx} />
				)
			}
			sx={
				[
					priceAiButtonSx,
					aiButtonStyles,
					removeLeftMargin ? { ml: 0 } : {}
				] as SxProps<Theme>
			}
			onClick={onClick}
		>
			{isLoading ? loadingLabel : isRepeatState ? repeatLabel : idleLabel}
		</Button>
	)
}
