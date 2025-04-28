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

	// Добавляем отсутствующий метод updateOrder
	const updateOrder = async (id: number, order: Order): Promise<void> => {
		// Здесь должна быть реализация обновления заказа
		// Временно используем заглушку
		console.log(`Updating order ${id}`, order)
		await refetchOrders()
	}

	return {
		// Заказы
		orders,
		currentOrder,
		setCurrentOrder,
		refetchOrders,
		createOrder: ordersApi.createOrder,
		updateOrder, // Добавляем метод

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
