import ClearIcon from '@mui/icons-material/Clear'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { SxProps, Theme } from '@mui/material'
import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material'

import type { AdEditFormData, FieldConfig } from '@/pages/AdEdit/model/types'
import * as styles from './styles'

type ParamsSectionProps = {
	fieldsConfig: FieldConfig[]
	params: AdEditFormData['params']
	warningInputSx: SxProps<Theme>
	onParamChange: (paramName: string, value: string | number | undefined) => void
	onClearParam: (paramName: string) => void
}

export const ParamsSection = ({
	fieldsConfig,
	params,
	warningInputSx,
	onParamChange,
	onClearParam
}: ParamsSectionProps) => {
	return (
		<Box>
			<Typography variant='h6' gutterBottom sx={styles.paramsSectionTitleSx}>
				Характеристики
			</Typography>
			<Box sx={styles.paramsFieldsColumnSx}>
				{fieldsConfig.map(field => {
					const paramsRecord = params as Record<
						string,
						string | number | undefined
					>
					const rawValue = paramsRecord[field.name]
					const value = rawValue ?? ''
					const inputStyles = value === '' ? warningInputSx : undefined
					const isNeedsRefine = value === ''

					return (
						<Box key={field.name}>
							<Typography gutterBottom sx={styles.paramsItemLabelSx}>
								{field.label}
							</Typography>
							{field.isSelect ? (
								<FormControl size='small' sx={styles.categoryFormControlSx}>
									<Select
										value={value}
										IconComponent={KeyboardArrowDownIcon}
										onChange={e => onParamChange(field.name, e.target.value)}
										sx={
											isNeedsRefine
												? ([
														styles.categorySelectSx,
														styles.refineSelectBorderSx
													] as SxProps<Theme>)
												: styles.categorySelectSx
										}
										displayEmpty
									>
										<MenuItem value='' disabled>
											<span style={styles.paramsSelectPlaceholderStyle}>
												{field.label}
											</span>
										</MenuItem>
										{field.options.map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							) : (
								<TextField
									size='medium'
									type={field.type === 'number' ? 'number' : 'text'}
									value={value}
									onChange={e =>
										onParamChange(
											field.name,
											field.type === 'number'
												? e.target.value === ''
													? undefined
													: Number(e.target.value)
												: e.target.value
										)
									}
									sx={
										inputStyles
											? ([
													styles.paramsTextInputSx,
													inputStyles
												] as SxProps<Theme>)
											: styles.paramsTextInputSx
									}
									InputProps={{
										endAdornment: value !== '' && (
											<InputAdornment position='end'>
												<IconButton
													size='small'
													onClick={() => onClearParam(field.name)}
													sx={styles.clearIconButtonSx}
												>
													<ClearIcon sx={styles.clearIconSx} />
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							)}
						</Box>
					)
				})}
			</Box>
		</Box>
	)
}
