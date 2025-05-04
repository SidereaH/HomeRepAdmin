import type {
	SigninRequest,
	AuthResponse,
	SignupRequest,
} from '../../types/auth'

export const signin = async (data: SigninRequest): Promise<AuthResponse> => {
	const response = await fetch(
		`${import.meta.env.VITE_MAIN_API_URL}/auth/signin`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	)

	if (!response.ok) {
		const error = await response.text()
		throw new Error(error || 'Login failed')
	}

	return response.json()
}

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
	const response = await fetch(
		`${import.meta.env.VITE_MAIN_API_URL}/auth/signup`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	)

	if (!response.ok) {
		const error = await response.text()
		throw new Error(error || 'Signup failed')
	}

	return response.json()
}

export const signupWithRole = async (
	data: SignupRequest
): Promise<AuthResponse> => {
	const response = await fetch(
		`${import.meta.env.VITE_MAIN_API_URL}/auth/signup_wrole`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	)

	if (!response.ok) {
		const error = await response.text()
		throw new Error(error || 'Signup with role failed')
	}

	return response.json()
}

export const createAdmin = async (
	data: SignupRequest
): Promise<AuthResponse> => {
	const response = await fetch(
		`${import.meta.env.VITE_MAIN_API_URL}/auth/create_admin`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	)

	if (!response.ok) {
		const error = await response.text()
		throw new Error(error || 'Admin creation failed')
	}

	return response.json()
}
