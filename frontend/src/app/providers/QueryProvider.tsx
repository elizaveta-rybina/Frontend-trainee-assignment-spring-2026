import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

interface Props {
	children: ReactNode
}

export const QueryProvider = ({ children }: Props) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Don't update when returning to the tab
						refetchOnWindowFocus: false,
						retry: 1,
						staleTime: 5 * 60 * 1000
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
