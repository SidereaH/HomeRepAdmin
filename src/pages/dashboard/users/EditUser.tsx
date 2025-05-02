import { createEffect, createSignal, Show } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'
import { useUsers } from '../../../hooks/useUsers'
import { Client, Status } from '../../../types/users'
export default function EditUser() {
	const params = useParams<{ id?: string }>() // Явно указываем тип параметра
	const navigate = useNavigate()
	const {
		currentClient,
		loadClient,
		updateClient,
		createClient,
		getClientLocation,
		updateClientLocation,
	} = useUsers()

	const [form, setForm] = createSignal<Partial<Client>>({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		phone: '',
		status: Status.CLIENT,
		latitude: '',
		longtitude: '',
	})
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal('')
	const [isNewUser, setIsNewUser] = createSignal(!params.id)

	// Загрузка данных пользователя при монтировании
	createEffect(async () => {
		if (params.id && params.id !== 'new') {
			setIsNewUser(false)
			await loadClient(Number(params.id))
			await getClientLocation(Number(params.id))
			setForm(currentClient() || {})
		} else {
			setIsNewUser(true)
			setForm({
				firstName: '',
				middleName: '',
				lastName: '',
				email: '',
				phone: '',
				status: Status.CLIENT,
				longtitude: '',
				latitude: '',
			})
		}
	})

	// Загрузка данных пользователя при монтировании
	createEffect(async () => {
		if (params.id) {
			if (params.id === 'new') {
				setIsNewUser(true)
			} else {
				setIsNewUser(false)
				await loadClient(Number(params.id))
				setForm(currentClient() || {})
			}
		}
	})

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			if (isNewUser()) {
				await createClient(form() as Omit<Client, 'id'>)
			} else {
				await updateClient(Number(params.id), form())
			}
			navigate('/users')
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: isNewUser()
					? 'Failed to create user'
					: 'Failed to update user'
			)
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (field: keyof Client) => (e: Event) => {
		const target = e.target as HTMLInputElement
		setForm({ ...form(), [field]: target.value })
	}

	return (
		<div class='container mx-auto px-4 py-8 max-w-4xl'>
			<h1 class='text-2xl font-bold mb-6'>
				{isNewUser() ? 'Create New User' : 'Edit User'}
			</h1>

			<Show when={error()}>
				<div class='bg-red-100 text-red-700 p-3 rounded mb-4'>{error()}</div>
			</Show>

			<form onSubmit={handleSubmit} class='space-y-6'>
				<div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Основные поля */}
					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							First Name *
						</label>
						<input
							type='text'
							value={form()?.firstName || ''}
							onInput={handleChange('firstName')}
							required
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Middle Name
						</label>
						<input
							type='text'
							value={form()?.middleName || ''}
							onInput={handleChange('middleName')}
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Last Name
						</label>
						<input
							type='text'
							value={form()?.lastName || ''}
							onInput={handleChange('lastName')}
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Email *
						</label>
						<input
							type='email'
							value={form()?.email || ''}
							onInput={handleChange('email')}
							required
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Phone *
						</label>
						<input
							type='tel'
							value={form()?.phone || ''}
							onInput={handleChange('phone')}
							required
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Status *
						</label>
						<select
							value={form()?.status || Status.CLIENT}
							onChange={e =>
								setForm({ ...form(), status: e.currentTarget.value as Status })
							}
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						>
							{Object.values(Status).map(status => (
								<option value={status}>{status}</option>
							))}
						</select>
					</div>
					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Longtitude *
						</label>
						<input
							// type='tel'
							value={form()?.longtitude || ''}
							onInput={handleChange('longtitude')}
							required
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>
					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Latitude *
						</label>

						<input
							// type='tel'
							value={form()?.latitude || ''}
							onInput={handleChange('latitude')}
							required
							class='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>
				</div>

				<div class='flex justify-end space-x-3 pt-4'>
					<button
						type='button'
						onClick={() => navigate('/users')}
						class='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Cancel
					</button>
					<button
						type='submit'
						disabled={loading()}
						class='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
					>
						{loading() ? (
							<span class='flex items-center justify-center'>
								<svg
									class='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
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
								{isNewUser() ? 'Creating...' : 'Saving...'}
							</span>
						) : isNewUser() ? (
							'Create User'
						) : (
							'Save Changes'
						)}
					</button>
				</div>
			</form>
			 <script src="https://api-maps.yandex.ru/v3/?apikey=YOUR_API_KEY&lang=ru_RU"></script>
        
		</div>
	)
}
