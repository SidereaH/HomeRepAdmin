export interface Order {
	id: number
	description: string
	category: Category
	customerId: number
	employeeId?: number
	address: Address
	paymentType: PaymentType
	accepted: boolean
	createdAt?: string
	updatedAt?: string
}

export interface Category {
	id: number
	name: string
	description?: string
	bestEmployeeId?: number
}

export interface Address {
	id?: number
	streetName: string
	buildingNumber: string
	apartmentNumber?: string
	cityName: string
	longitude: number
	latitude: number
}

export interface PaymentType {
	id: number
	name: string
	description?: string
	isActive: boolean
}

export interface DefaultResponse<T = any> {
	object: T
	message: string
}

export interface AssignResponse {
	message: string
	orderId: number
	workerId: number
}

export interface FindWorkerParams {
	orderId: number
}

export interface AssignWorkerParams {
	orderId: number
	workerId: number
}

export interface PaymentStatusParams {
	paymentName: string
}
