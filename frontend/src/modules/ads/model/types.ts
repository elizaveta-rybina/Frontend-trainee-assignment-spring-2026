export type ItemCategory = 'auto' | 'real_estate' | 'electronics'

export type AutoParams = {
	brand?: string
	model?: string
	yearOfManufacture?: number
	transmission?: 'automatic' | 'manual'
	mileage?: number
	enginePower?: number
}
export type RealEstateParams = {
	type?: 'flat' | 'house' | 'room'
	address?: string
	area?: number
	floor?: number
}
export type ElectronicsParams = {
	type?: 'phone' | 'laptop' | 'misc'
	brand?: string
	model?: string
	condition?: 'new' | 'used'
	color?: string
}

// return /items/:id
export type AdDetails = {
	id: number
	title: string
	description?: string
	price: number | null
	createdAt: string
	updatedAt: string
	needsRevision: boolean
} & (
	| { category: 'auto'; params: AutoParams }
	| { category: 'real_estate'; params: RealEstateParams }
	| { category: 'electronics'; params: ElectronicsParams }
)

// return /items
export interface AdListItem {
	id: number
	category: ItemCategory
	title: string
	price: number | null
	needsRevision: boolean
}

// Parameters for GET /items
export interface GetAdsParams {
	q?: string
	limit?: number
	skip?: number
	categories?: ItemCategory[]
	needsRevision?: boolean
	sortColumn?: 'title' | 'createdAt'
	sortDirection?: 'asc' | 'desc'
}

// Payload for PUT /items/:id
export type UpdateAdPayload = Omit<
	AdDetails,
	'id' | 'createdAt' | 'updatedAt' | 'needsRevision'
>
