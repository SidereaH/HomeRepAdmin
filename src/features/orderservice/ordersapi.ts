import type {
	Order,
	Category,
	PaymentType,
	DefaultResponse,
	AssignResponse,
	FindWorkerParams,
	AssignWorkerParams,
	PaymentStatusParams,
} from '../../types/orders'

const API_URL = import.meta.env.VITE_MAIN_API_URL || 'http://localhost:8080'

async function fetchApi<T>(
	endpoint: string,
	method: string = 'GET',
	body?: any,
	queryParams?: Record<string, string | number>
): Promise<T> {
	let url = `${API_URL}/api${endpoint}`

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
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
		body: body ? JSON.stringify(body) : undefined,
	})

	if (!response.ok) {
		const error = await response.text()
		throw new Error(error || 'Request failed')
	}

	return response.json()
}

export const ordersApi = {
	// Заказы
	createOrder: (order: Omit<Order, 'id'>): Promise<DefaultResponse<Order>> =>
		fetchApi<DefaultResponse<Order>>('/orders', 'POST', order),

	getAllOrders: (): Promise<Order[]> => fetchApi<Order[]>('/orders'),

	findWorker: (params: FindWorkerParams): Promise<number> =>
		fetchApi<number>('/orders/order/findWorker', 'POST', null, {
			orderID: params.orderId,
		}),

	assignWorker: (params: AssignWorkerParams): Promise<AssignResponse> =>
		fetchApi<AssignResponse>(
			`/orders/order/${params.orderId}/assignWorker/${params.workerId}`,
			'POST'
		),

	// Категории
	getAllCategories: (): Promise<Category[]> =>
		fetchApi<Category[]>('/categories'),

	createCategory: (category: Omit<Category, 'id'>): Promise<Category> =>
		fetchApi<Category>('/categories', 'POST', category),

	// Платежи
	getAllPayments: (): Promise<PaymentType[]> =>
		fetchApi<PaymentType[]>('/payments'),

	createPayment: (payment: Omit<PaymentType, 'id'>): Promise<DefaultResponse> =>
		fetchApi<DefaultResponse>('/payments', 'POST', payment),

	activatePayment: (params: PaymentStatusParams): Promise<DefaultResponse> =>
		fetchApi<DefaultResponse>('/payments/activate', 'PATCH', null, {
			paymentName: params.paymentName,
		}),

	deactivatePayment: (params: PaymentStatusParams): Promise<DefaultResponse> =>
		fetchApi<DefaultResponse>('/payments/deactivate', 'PATCH', null, {
			paymentName: params.paymentName,
		}),

	deletePayment: (params: PaymentStatusParams): Promise<void> =>
		fetchApi<void>('/payments', 'DELETE', null, {
			paymentTypeName: params.paymentName,
		}),
}
