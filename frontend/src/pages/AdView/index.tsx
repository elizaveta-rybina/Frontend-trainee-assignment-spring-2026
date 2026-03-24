import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import ImageIcon from '@mui/icons-material/Image'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Paper,
	Typography
} from '@mui/material'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import type { ItemCategory } from '@/modules/ads/model/types'
import { useAd } from '@/modules/ads/query/hooks'
import * as styles from './styles'

type ParamValue = string | number | null | undefined

const PARAMS_LABELS: Record<ItemCategory, Record<string, string>> = {
	auto: {
		brand: 'Марка',
		model: 'Модель',
		yearOfManufacture: 'Год выпуска',
		transmission: 'Коробка передач',
		mileage: 'Пробег',
		enginePower: 'Мощность двигателя'
	},
	real_estate: {
		type: 'Тип объекта',
		address: 'Адрес',
		area: 'Площадь',
		floor: 'Этаж'
	},
	electronics: {
		type: 'Тип',
		brand: 'Бренд',
		model: 'Модель',
		condition: 'Состояние',
		color: 'Цвет'
	}
}

const VALUES_LABELS: Record<string, string> = {
	automatic: 'Автомат',
	manual: 'Механика',
	flat: 'Квартира',
	house: 'Дом',
	room: 'Комната',
	phone: 'Телефон',
	laptop: 'Ноутбук',
	misc: 'Другое',
	new: 'Новое',
	used: 'Б/У'
}

const formatPrice = (price: number | null) =>
	price === null
		? 'Цена не указана'
		: `${new Intl.NumberFormat('ru-RU').format(price)} ₽`

const isEmptyValue = (value: ParamValue) =>
	value === undefined || value === null || value === ''

const getDisplayValue = (value: ParamValue) => {
	if (typeof value === 'string' && VALUES_LABELS[value]) {
		return VALUES_LABELS[value]
	}

	return value
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date)
}

export const AdView = () => {
	const { id } = useParams()
	const numericId = Number(id)

	const { data: ad, isLoading, isError } = useAd(numericId)

	const missingFields = useMemo(() => {
		if (!ad?.needsRevision) return []

		const categoryLabels = PARAMS_LABELS[ad.category]
		const paramsRecord = ad.params as Record<string, ParamValue>
		const missing = !ad.description ? ['Описание'] : []

		Object.entries(categoryLabels).forEach(([key, label]) => {
			if (isEmptyValue(paramsRecord[key])) {
				missing.push(label)
			}
		})

		return missing
	}, [ad])

	if (isLoading) {
		return (
			<Box sx={styles.loadingSx}>
				<CircularProgress />
			</Box>
		)
	}

	if (isError || !ad) {
		return (
			<Container sx={styles.errorContainerSx}>
				<Typography variant='h5' color='error'>
					Объявление не найдено или произошла ошибка
				</Typography>
				<Button
					component={Link}
					to='/ads'
					sx={styles.errorButtonSx}
					variant='contained'
				>
					Вернуться к списку
				</Button>
			</Container>
		)
	}

	const categoryLabels = PARAMS_LABELS[ad.category]
	const paramsRecord = ad.params as Record<string, ParamValue>

	return (
		<Container maxWidth='lg' sx={styles.pageSx}>
			<Button
				component={Link}
				to='/ads'
				startIcon={<ArrowBackIcon />}
				sx={styles.backButtonSx}
			>
				Назад к объявлениям
			</Button>

			<Box sx={styles.titleRowSx}>
				<Typography variant='h4' fontWeight={600} sx={styles.titleSx}>
					{ad.title}
				</Typography>
				<Typography variant='h4' fontWeight={600} sx={styles.priceSx}>
					{formatPrice(ad.price)}
				</Typography>
			</Box>

			<Box sx={styles.headerActionsRowSx}>
				<Button
					component={Link}
					to={`/ads/${ad.id}/edit`}
					variant='contained'
					color='primary'
					startIcon={<EditIcon />}
					sx={styles.editButtonSx}
				>
					Редактировать
				</Button>
				<Box sx={styles.datesSx}>
					<Typography variant='body2'>
						Опубликовано: {formatDate(ad.createdAt)}
					</Typography>
					<Typography variant='body2'>
						Отредактировано: {formatDate(ad.updatedAt)}
					</Typography>
				</Box>
			</Box>

			<Grid container spacing={4}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Box sx={styles.imageBoxSx}>
						<ImageIcon sx={{ fontSize: 80, color: 'grey.400' }} />
					</Box>

					<Typography variant='h6' fontWeight={600} gutterBottom>
						Описание
					</Typography>
					<Typography
						variant='body1'
						sx={styles.descriptionSx(Boolean(ad.description))}
					>
						{ad.description || 'Описание пока не добавлено.'}
					</Typography>
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					{ad.needsRevision && missingFields.length > 0 && (
						<Paper elevation={0} sx={styles.revisionPaperSx}>
							<WarningAmberIcon sx={styles.revisionIconSx} />
							<Box>
								<Typography
									variant='subtitle1'
									fontWeight={600}
									sx={styles.revisionTitleSx}
								>
									Требуются доработки
								</Typography>
								<Typography variant='body2' sx={styles.revisionTextSx}>
									У объявления не заполнены поля:
								</Typography>
								<Box component='ul' sx={styles.missingListSx}>
									{missingFields.map(field => (
										<li key={field}>{field}</li>
									))}
								</Box>
							</Box>
						</Paper>
					)}

					<Typography variant='h6' fontWeight={600} gutterBottom>
						Характеристики
					</Typography>
					<Box sx={styles.specsWrapSx}>
						{Object.entries(categoryLabels).map(([key, label]) => {
							const rawValue = paramsRecord[key]
							if (isEmptyValue(rawValue)) {
								return null
							}

							const displayValue = getDisplayValue(rawValue)

							return (
								<Box key={key} sx={styles.specRowSx}>
									<Typography variant='body1' color='text.secondary'>
										{label}
									</Typography>
									<Typography variant='body1'>{displayValue}</Typography>
								</Box>
							)
						})}
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}
