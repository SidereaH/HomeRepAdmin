import { auth } from '../../stores/authStore'
import type {
	Client,
	GeoPair,
	GeoTimeRequest,
	Status,
	UpdateLocationParams,
	UsersInAreaParams,
} from '../../types/users'

const API_URL = import.meta.env.VITE_MAIN_API_URL

// Общая функция для HTTP-запросов
async function fetchApi<T>(
	endpoint: string,
	method: string = 'GET',
	body?: any,
	queryParams?: Record<string, string | number>
): Promise<T> {
	// Формируем URL с query-параметрами
	let url = `${API_URL}/api/users${endpoint}`
	if (queryParams) {
		const params = new URLSearchParams()
		Object.entries(queryParams).forEach(([key, value]) => {
			params.append(key, String(value))
		})
		url += `?${params.toString()}`
	}

	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${auth.accessToken}`,
		},
		body: body ? JSON.stringify(body) : undefined,
	})

	if (!response.ok) {
		const error = await response.text()
		throw new Error(error || 'Request failed')
	}

	return response.json()
}

// CRUD операции с пользователями
export const usersApi = {
	// Создать пользователя
	createClient: (client: Omit<Client, 'id'>): Promise<Client> =>
		fetchApi<Client>('', 'POST', client),

	// Получить всех пользователей
	getAllClients: (): Promise<Client[]> => fetchApi<Client[]>(''),

	// Получить пользователя по ID
	getClientById: (id: number): Promise<Client> => fetchApi<Client>(`/${id}`),

	// Обновить пользователя
	updateClient: (id: number, client: Partial<Client>): Promise<Client> =>
		fetchApi<Client>(`/${id}`, 'PUT', client),

	// Удалить пользователя
	deleteClient: (id: number): Promise<void> =>
		fetchApi<void>(`/${id}`, 'DELETE'),

	// Обновить местоположение пользователя
	updateClientLocation: (
		id: number,
		params: UpdateLocationParams
	): Promise<void> =>
		fetchApi<void>(`/${id}/location`, 'POST', null, {
			lat: params.lat,
			lng: params.lng,
		}),

	// Получить местоположение пользователя
	getClientLocation: (id: number): Promise<GeoPair> =>
		fetchApi<GeoPair>(`/${id}/location`),

	// Получить историю местоположений
	getLocationHistory: (timeRequest: GeoTimeRequest): Promise<GeoPair[]> =>
		fetchApi<GeoPair[]>('/locations', 'GET', timeRequest),

	// Получить пользователей в области
	getUsersInArea: (params: UsersInAreaParams): Promise<number[]> =>
		fetchApi<number[]>('/location/area', 'GET', null, {
			lat: params.lat,
			lng: params.lng,
			maxUsers: params.maxUsers,
		}),

	// Изменить статус пользователя
	updateClientStatus: (id: number, status: Status): Promise<Client> =>
		fetchApi<Client>(`/${id}/status`, 'PATCH', { status }),
}
