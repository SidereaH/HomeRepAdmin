export interface SigninRequest {
	phone: string
	password: string
}
export interface SignupRequest {
	username: string
	email: string
	phone: string
	password: string
	status: Status
}
export enum Status {
	CLIENT = 'CLIENT',
	EMPLOYEE = 'EMPLOYEE',
	EMPLOYER = 'EMPLOYER',
	ADMIN = 'ADMIN',
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	userPhone: string
}
