import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { AppRouter } from '@/app/router'

function App() {
	return (
		<ErrorBoundary>
			<ThemeProvider>
				<QueryProvider>
					<AppRouter />
				</QueryProvider>
			</ThemeProvider>
		</ErrorBoundary>
	)
}

export default App
