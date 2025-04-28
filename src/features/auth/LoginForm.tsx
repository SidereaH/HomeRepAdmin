// src/features/auth/LoginForm.tsx
import { createSignal } from 'solid-js'
import type { SigninRequest } from '../../types/auth'
import { signin } from './api'

export const LoginForm = () => {
	const [form, setForm] = createSignal<SigninRequest>({
		phone: '',
		password: '',
	})

	const [error, setError] = createSignal('')
	const [loading, setLoading] = createSignal(false)

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		setForm({ ...form(), [target.name]: target.value })
	}

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			const response = await signin(form())
			localStorage.setItem('accessToken', response.accessToken)
			localStorage.setItem('refreshToken', response.refreshToken)
			// переход в админку
			window.location.href = '/dashboard'
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} class='flex flex-col gap-6 w-full'>
			<div class='space-y-4'>
				<div>
					<label
						for='phone'
						class='block text-sm font-medium text-gray-700 mb-1'
					>
						Телефон
					</label>
					<input
						id='phone'
						name='phone'
						type='text'
						placeholder='+7 (999) 123-45-67'
						class='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
						value={form().phone}
						onInput={handleChange}
						required
					/>
				</div>

				<div>
					<label
						for='password'
						class='block text-sm font-medium text-gray-700 mb-1'
					>
						Пароль
					</label>
					<input
						id='password'
						name='password'
						type='password'
						placeholder='••••••••'
						class='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
						value={form().password}
						onInput={handleChange}
						required
					/>
				</div>
			</div>

			{error() && (
				<div class='px-4 py-3 bg-red-50 text-red-700 rounded-lg text-sm'>
					{error()}
				</div>
			)}

			<button
				type='submit'
				class='w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed'
				disabled={loading()}
			>
				{loading() ? (
					<span class='flex items-center justify-center'>
						<svg
							class='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle
								class='opacity-25'
								cx='12'
								cy='12'
								r='10'
								stroke='currentColor'
								stroke-width='4'
							></circle>
							<path
								class='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							></path>
						</svg>
						Входим...
					</span>
				) : (
					'Войти'
				)}
			</button>
		</form>
	)
}
