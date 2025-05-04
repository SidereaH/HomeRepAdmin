import { createSignal } from 'solid-js'
import type {
	SigninRequest,
	AuthResponse,
	SignupRequest,
	Status,
} from '../types/auth'
import {
	signin as apiSignin,
	signup as apiSignup,
	signupWithRole as apiSignupWithRole,
	createAdmin as apiCreateAdmin,
} from '../features/auth/api'

export function useAuth() {
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal<string | null>(null)
	const [authData, setAuthData] = createSignal<AuthResponse | null>(null)

	const handleAuth = async (
		authFn: (data: any) => Promise<AuthResponse>,
		data: any
	) => {
		setLoading(true)
		setError(null)
		try {
			const response = await authFn(data)
			setAuthData(response)
			return response
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unknown error occurred')
			throw err
		} finally {
			setLoading(false)
		}
	}

	const login = async (data: SigninRequest) => {
		return handleAuth(apiSignin, data)
	}

	const register = async (data: Omit<SignupRequest, 'status'>) => {
		return handleAuth(apiSignup, data)
	}

	const registerWithRole = async (data: SignupRequest) => {
		return handleAuth(apiSignupWithRole, data)
	}

	const registerAdmin = async (data: Omit<SignupRequest, 'status'>) => {
		return handleAuth(apiCreateAdmin, data)
	}

	const logout = () => {
		setAuthData(null)
		// Add any additional logout logic here (e.g., clearing tokens from storage)
	}

	return {
		loading,
		error,
		authData,
		login,
		register,
		registerWithRole,
		registerAdmin,
		logout,
		isAuthenticated: () => !!authData()?.accessToken,
	}
}
