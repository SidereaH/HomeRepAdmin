import type { SigninRequest, AuthResponse } from '../../types/auth'

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
