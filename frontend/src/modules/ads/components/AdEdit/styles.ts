import type { SxProps, Theme } from '@mui/material'

export const fieldLabelSx: SxProps<Theme> = {
	fontFamily: 'inherit',
	fontWeight: 600,
	fontSize: '20px',
	lineHeight: '22px',
	letterSpacing: '0',
	paddingBottom: '8px'
}

export const textInputSx: SxProps<Theme> = {
	width: 456,
	'& .MuiOutlinedInput-root': {
		height: 36,
		borderRadius: '8px',
		'& .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #D9D9D9'
		},
		'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #40A9FF'
		},
		'&.Mui-focused': {
			boxShadow: '0px 0px 0px 2px #1890FF33'
		}
	},
	'& .MuiOutlinedInput-input': {
		padding: '4px 12px',
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 400,
		fontSize: '16px',
		lineHeight: '22px',
		letterSpacing: '0',
		verticalAlign: 'middle',
		color: '#1E1E1E'
	}
}

export const descriptionInputSx: SxProps<Theme> = {
	width: '100%',
	'& .MuiOutlinedInput-root': {
		borderRadius: '8px',
		'& .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #D9D9D9'
		}
	},
	'& .MuiOutlinedInput-input, & .MuiOutlinedInput-inputMultiline': {
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 400,
		fontSize: '16px',
		lineHeight: '22px',
		letterSpacing: '0',
		color: '#1E1E1E'
	}
}

export const sectionDividerSx: SxProps<Theme> = {
	height: '1px',
	bgcolor: '#F0F0F0',
	width: '100%',
	my: '18px'
}

export const clearIconButtonSx: SxProps<Theme> = {
	width: 18,
	height: 18,
	p: 0,
	bgcolor: '#BFBFBF',
	color: '#FFFFFF',
	'&:hover': {
		bgcolor: '#A6A6A6'
	}
}

export const clearIconSx: SxProps<Theme> = {
	fontSize: 14
}

export const requiredAsteriskStyle = {
	color: '#FF4D4F',
	fontFamily: 'SimSong',
	fontSize: '14px',
	lineHeight: '22px'
} as const

export const categoryFormControlSx: SxProps<Theme> = {
	width: 256
}

export const categorySelectSx: SxProps<Theme> = {
	height: 36,
	borderRadius: '8px',
	'& .MuiOutlinedInput-notchedOutline': {
		borderWidth: '1px',
		borderColor: '#d9d9d9'
	},
	'& .MuiSelect-select': {
		paddingTop: '4px',
		paddingRight: '32px',
		paddingBottom: '4px',
		paddingLeft: '12px',
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 400,
		fontSize: '16px',
		lineHeight: '22px',
		letterSpacing: '0',
		verticalAlign: 'middle',
		color: '#1E1E1E'
	},
	'& .MuiSelect-icon': {
		right: 10,
		fontSize: 16,
		color: '#8c8c8c'
	}
}

export const priceRowSx: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center'
}

export const popoverErrorPaperSx: SxProps<Theme> = {
	mt: 1,
	p: 2,
	width: 360,
	borderRadius: 2,
	bgcolor: '#fff2f0',
	border: '1px solid #ffccc7',
	boxShadow: 'none'
}

export const popoverDefaultPaperSx: SxProps<Theme> = {
	mt: 1,
	p: 2,
	width: 360,
	borderRadius: 2,
	boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
}

export const popoverCloseButtonSx: SxProps<Theme> = {
	bgcolor: '#ffa39e',
	color: '#000',
	boxShadow: 'none',
	'&:hover': { bgcolor: '#ff7875', boxShadow: 'none' },
	textTransform: 'none'
}

export const popoverApplyButtonSx: SxProps<Theme> = {
	boxShadow: 'none',
	textTransform: 'none'
}

export const popoverSecondaryButtonSx: SxProps<Theme> = {
	borderColor: '#d9d9d9',
	textTransform: 'none'
}

export const descriptionActionsRowSx: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	mt: 1
}

export const descPopoverErrorPaperSx: SxProps<Theme> = {
	mt: 1,
	p: 2,
	width: 380,
	borderRadius: 2,
	bgcolor: '#fff2f0',
	border: '1px solid #ffccc7',
	boxShadow: 'none'
}

export const descPopoverDefaultPaperSx: SxProps<Theme> = {
	mt: 1,
	p: 2,
	width: 380,
	borderRadius: 2,
	boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
}

export const descPopoverErrorTitleSx: SxProps<Theme> = {
	mb: 1
}

export const descPopoverErrorMessageSx: SxProps<Theme> = {
	mb: 2,
	color: 'text.primary'
}

export const descPopoverResponseTitleSx: SxProps<Theme> = {
	mb: 1
}

export const descPopoverResponseTextSx: SxProps<Theme> = {
	mb: 2,
	whiteSpace: 'pre-wrap',
	maxHeight: 200,
	overflowY: 'auto'
}

export const descPopoverActionsRowSx: SxProps<Theme> = {
	display: 'flex',
	gap: 1
}

export const descriptionCounterSx: SxProps<Theme> = {
	color: 'text.secondary'
}

export const editActionsRowSx: SxProps<Theme> = {
	display: 'flex',
	gap: 2
}

export const editSaveButtonSx: SxProps<Theme> = {
	width: 108,
	minWidth: 108,
	height: 38,
	borderRadius: '8px',
	gap: '8px',
	pt: '8px',
	pr: '12px',
	pb: '8px',
	pl: '12px',
	bgcolor: '#1890FF',
	'&:hover': { bgcolor: '#40A9FF' }
}

export const editSaveSpinnerSx: SxProps<Theme> = {
	color: '#FFFFFF'
}

export const editCancelButtonSx: SxProps<Theme> = {
	width: 102,
	minWidth: 102,
	height: 38,
	borderRadius: '8px',
	gap: '8px',
	pt: '8px',
	pr: '12px',
	pb: '8px',
	pl: '12px',
	bgcolor: '#D9D9D9',
	color: 'text.primary',
	boxShadow: 'none',
	'&:hover': { bgcolor: '#CFCFCF', boxShadow: 'none' }
}

export const priceAiButtonSx = {
	width: 200,
	minWidth: 195,
	height: 36,
	borderRadius: '8px',
	pl: '7px',
	pr: '7px',
	fontFamily: 'Roboto, sans-serif',
	fontWeight: 400,
	fontSize: '14px',
	lineHeight: '22px',
	letterSpacing: '0',
	textAlign: 'center',
	textTransform: 'none'
} as const

export const priceAiAccentIconSx = {
	color: '#FFA940',
	fontSize: 14
} as const

export const paramsSectionTitleSx: SxProps<Theme> = {
	...fieldLabelSx,
	mt: 2
}

export const paramsFieldsColumnSx: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2
}

export const paramsItemLabelSx: SxProps<Theme> = {
	fontFamily: 'Roboto, sans-serif',
	fontWeight: 400,
	fontSize: '14px',
	lineHeight: '22px',
	letterSpacing: '0',
	color: 'text.secondary'
}

export const paramsSelectPlaceholderStyle = {
	color: '#aaa'
} as const

export const paramsTextInputSx: SxProps<Theme> = {
	width: 456,
	'& .MuiOutlinedInput-root': {
		height: 36,
		borderRadius: '8px',
		'& .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #D9D9D9'
		},
		'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: '1px solid #40A9FF'
		},
		'&.Mui-focused': {
			boxShadow: '0px 0px 0px 2px #1890FF33'
		}
	},
	'& .MuiOutlinedInput-input': {
		padding: '4px 12px',
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 400,
		fontSize: '14px',
		lineHeight: '22px',
		letterSpacing: '0',
		verticalAlign: 'middle',
		color: '#1E1E1E'
	}
}

export const refineInputBorderSx: SxProps<Theme> = {
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940 !important'
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940 !important'
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940 !important'
	}
}

export const refineSelectBorderSx: SxProps<Theme> = {
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940 !important'
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940 !important'
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: '#FFA940 !important'
	}
}

export const requiredInputErrorBorderSx: SxProps<Theme> = {
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: '#EC221F !important'
	},
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#EC221F !important'
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: '#EC221F !important'
	}
}

export const requiredFieldErrorTextSx: SxProps<Theme> = {
	mt: '4px',
	fontFamily: 'Roboto, sans-serif',
	fontWeight: 400,
	fontSize: '12px',
	lineHeight: '20px',
	letterSpacing: '0',
	color: '#EC221F'
}
