import { createResource, createSignal } from 'solid-js'
import type {
	Order,
	Category,
	PaymentType,
	AssignResponse,
	FindWorkerParams,
	AssignWorkerParams,
} from '../types/orders'
import { ordersApi } from '../features/orderservice/ordersapi'

export function useOrders() {
	// Заказы
	const [orders, { refetch: refetchOrders }] = createResource(
		ordersApi.getAllOrders
	)

	// Текущий заказ (используем сигнал вместо ресурса для простоты)
	const [currentOrder, setCurrentOrder] = createSignal<Order | null>(null)

	// Категории
	const [categories, { refetch: refetchCategories }] = createResource(
		ordersApi.getAllCategories
	)
	const [currentCategory, setCurrentCategory] = createSignal<Category | null>(
		null
	)

	// Платежи
	const [payments, { refetch: refetchPayments }] = createResource(
		ordersApi.getAllPayments
	)
	const [currentPayment, setCurrentPayment] = createSignal<PaymentType | null>(
		null
	)

	// Работники
	const [foundWorker, setFoundWorker] = createSignal<number | null>(null)
	const [assignmentResult, setAssignmentResult] =
		createSignal<AssignResponse | null>(null)

	// Метод для загрузки заказа по ID
	const fetchOrderById = async (id: number): Promise<void> => {
		try {
			const order = await ordersApi.getOrderById(id)
			setCurrentOrder(order)
		} catch (error) {
			console.error('Failed to fetch order:', error)
			setCurrentOrder(null)
		}
	}

	// Метод для обновления заказа
	const updateOrder = async (id: number, order: Order): Promise<void> => {
		await ordersApi.updateOrder(id, order)
		await refetchOrders()
		setCurrentOrder(order)
	}

	return {
		// Заказы
		orders,
		currentOrder,
		setCurrentOrder, // Добавляем setter в возвращаемый объект
		fetchOrderById,
		refetchOrders,
		createOrder: ordersApi.createOrder,
		updateOrder,

		deleteOrder: ordersApi.deleteOrder,

		// Работники
		findWorker: async (params: FindWorkerParams) => {
			const workerId = await ordersApi.findWorker(params)
			setFoundWorker(workerId)
			return workerId
		},
		assignWorker: async (params: AssignWorkerParams) => {
			const result = await ordersApi.assignWorker(params)
			setAssignmentResult(result)
			await refetchOrders()
			return result
		},
		foundWorker,
		assignmentResult,

		// Категории
		categories,
		currentCategory,
		setCurrentCategory,
		refetchCategories,
		createCategory: ordersApi.createCategory,

		// Платежи
		payments,
		currentPayment,
		setCurrentPayment,
		refetchPayments,
		createPayment: ordersApi.createPayment,
		activatePayment: ordersApi.activatePayment,
		deactivatePayment: ordersApi.deactivatePayment,
		deletePayment: ordersApi.deletePayment,
	}
}
