export interface SigninRequest {
	phone: string
	password: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	userPhone: string
}
