import { createStore } from 'solid-js/store'

export const [auth, setAuth] = createStore({
	isAuthenticated: false,
	accessToken: '',
	refreshToken: '',
	user: '',
})

export const authActions = {
	login: (token: string, refresh: string, userPhone: string) => {
		setAuth({
			isAuthenticated: true,
			accessToken: token,
			refreshToken: refresh,
			user: userPhone,
		})
	},
	logout: () => {
		setAuth({
			isAuthenticated: false,
			accessToken: '',
			refreshToken: '',
			user: '',
		})
	},
}
