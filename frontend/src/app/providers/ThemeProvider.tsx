import { useThemeStore } from '@/shared/store/themeStore'
import {
	createTheme,
	CssBaseline,
	ThemeProvider as MuiThemeProvider
} from '@mui/material'
import { type ReactNode, useMemo } from 'react'

interface Props {
	children: ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
	const mode = useThemeStore(state => state.mode)

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: '#1976d2'
					}
				},
				typography: {
					fontFamily: 'Inter, system-ui, sans-serif'
				}
			}),
		[mode]
	)

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	)
}
