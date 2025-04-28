import { createAsyncStore } from '@solidjs/router'
import { createResource, createSignal } from 'solid-js'
import { usersApi } from '../features/userservice/usersapi'
import { Client, GeoPair, GeoTimeRequest } from '../types/users'

export function useUsers() {
	// Используем createResource для лучшего управления состоянием
	const [clients, { refetch: refetchClients }] = createResource(
		usersApi.getAllClients
	)

	// Работа с конкретным пользователем
	const [currentClient, setCurrentClient] = createSignal<Client | null>(null)

	const loadClient = async (id: number) => {
		const client = await usersApi.getClientById(id)
		setCurrentClient(client)
		return client
	}

	// Локации
	const [clientLocation, setClientLocation] = createSignal<GeoPair | null>(null)
	const [locationHistory, setLocationHistory] = createSignal<GeoPair[]>([])

	return {
		// Пользователи - теперь clients() возвращает Client[] | undefined
		clients: () => clients() || [],
		refetchClients,
		currentClient,
		loadClient,

		createClient: usersApi.createClient,
		updateClient: usersApi.updateClient,
		deleteClient: usersApi.deleteClient,

		// Локации
		clientLocation,
		setClientLocation,
		locationHistory,
		setLocationHistory,

		getClientLocation: usersApi.getClientLocation,
		updateClientLocation: usersApi.updateClientLocation,
		getLocationHistory: async (request: GeoTimeRequest) => {
			const history = await usersApi.getLocationHistory(request)
			setLocationHistory(history)
			return history
		},

		// Дополнительные методы
		getUsersInArea: usersApi.getUsersInArea,
		updateClientStatus: usersApi.updateClientStatus,
	}
}
