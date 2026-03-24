import ImageIcon from '@mui/icons-material/Image'
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Chip,
	Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import { CATEGORY_LABELS } from '../../model/constants'
import type { AdListItem } from '../../model/types'
import * as styles from './styles'

const formatPrice = (price: number | null) => {
	if (price === null) return 'Цена не указана'
	return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

interface AdCardProps extends AdListItem {
	view?: 'grid' | 'list'
}

export const AdCard = ({
	id,
	title,
	price,
	category,
	needsRevision,
	view = 'grid'
}: AdCardProps) => {
	const isList = view === 'list'

	return (
		<Card elevation={0} sx={styles.cardSx}>
			<CardActionArea
				component={Link}
				to={`/ads/${id}`}
				sx={styles.actionAreaSx(isList)}
			>
				<Box sx={styles.imageBoxSx(isList)}>
					<ImageIcon sx={{ fontSize: 64, color: 'grey.300' }} />
				</Box>

				<CardContent sx={styles.cardContentSx}>
					<Chip
						label={CATEGORY_LABELS[category]}
						size='small'
						variant='outlined'
						sx={styles.categoryChipSx}
					/>

					<Typography variant='subtitle1' fontWeight={500} sx={styles.titleSx}>
						{title}
					</Typography>

					<Typography variant='h6' fontWeight={600} sx={styles.priceSx}>
						{formatPrice(price)}
					</Typography>

					{needsRevision && (
						<Box sx={styles.revisionBadgeSx}>
							<Box sx={styles.revisionDotSx} />
							<Typography variant='caption' fontWeight={500}>
								Требует доработок
							</Typography>
						</Box>
					)}
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
