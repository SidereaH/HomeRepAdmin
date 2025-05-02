export interface Client {
	id: number
	firstName: string
	middleName?: string
	lastName?: string
	email?: string
	phone?: string
	status?: Status
	latitude?: string
	longtitude?: string
}

export enum Status {
	CLIENT = 'CLIENT',
	EMPLOYEE = 'EMPLOYEE',
	EMPLOYER = 'EMPLOYER',
	ADMIN = 'ADMIN',
}

export interface GeoPair {
	lat: number
	lng: number
	time?: string // ISO format
}

export interface GeoTimeRequest {
	userId: number
	startTime: string // ISO format
	endTime: string // ISO format
}

export interface UpdateLocationParams {
	lat: number
	lng: number
}

export interface UsersInAreaParams {
	lat: number
	lng: number
	maxUsers: number
}
