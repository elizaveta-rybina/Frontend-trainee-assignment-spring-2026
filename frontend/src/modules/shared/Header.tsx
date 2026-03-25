import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, Container, IconButton } from '@mui/material'

import { useThemeStore } from '@/shared/store/themeStore'

export const Header = () => {
	const { mode, toggleTheme } = useThemeStore()

	return (
		<Box sx={{ mb: 1 }}>
			<Container maxWidth='xl'>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 2 }}>
					<IconButton
						onClick={toggleTheme}
						color='inherit'
						title={`Переключить на ${mode === 'light' ? 'тёмную' : 'светлую'} тему`}
					>
						{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
					</IconButton>
				</Box>
			</Container>
		</Box>
	)
}
