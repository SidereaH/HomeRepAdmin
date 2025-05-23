import { useParams, useNavigate } from '@solidjs/router'
import { createEffect, createSignal, Show } from 'solid-js'
import { useOrders } from '../../../hooks/useOrders'

export default function ConfirmAssignment() {
	const params = useParams()
	const navigate = useNavigate()
	const { fetchOrderById, currentOrder, assignWorker, refetchOrders } =
		useOrders()

	const [loading, setLoading] = createSignal(true)
	const [error, setError] = createSignal('')
	const [employee, setEmployee] = createSignal<{
		fullName: string
		phone: string
	}>()

	const orderId = Number(params.orderId)
	const employeeId = Number(params.employeeId)

	createEffect(() => {
		if (!orderId || !employeeId) {
			setError('Invalid parameters')
			return
		}
		;(async () => {
			try {
				setLoading(true)
				await fetchOrderById(orderId)

				// Пример получения данных работника (может быть заменено на API вызов, если нужно)
				// Здесь просто заглушка для примера
				setEmployee({
					fullName: 'Иванов Иван Иванович',
					phone: '+7 (999) 123-45-67',
				})
			} catch (err) {
				setError('Failed to load order or employee info')
			} finally {
				setLoading(false)
			}
		})()
	})

	const handleConfirm = async () => {
		try {
			await assignWorker({ orderId, workerId: employeeId })
			await refetchOrders()
			alert('Вы подтвердили выполнение заказа')
		} catch (err) {
			setError('Ошибка при подтверждении заказа')
		}
	}

	return (
		<div class='max-w-2xl mx-auto p-6 bg-white shadow rounded mt-8'>
			<Show when={error()}>
				<div class='bg-red-100 text-red-700 p-3 rounded mb-4'>{error()}</div>
			</Show>

			<Show when={!loading()} fallback={<p>Загрузка...</p>}>
				<h2 class='text-xl font-bold mb-4'>Подтверждение заказа</h2>

				<div class='mb-6'>
					<h3 class='text-lg font-semibold mb-2'>Информация о мастере</h3>
					<p>
						<strong>ФИО:</strong> {employee()?.fullName}
					</p>
					<p>
						<strong>Телефон:</strong> {employee()?.phone}
					</p>
				</div>

				<Show when={currentOrder()}>
					<div class='mb-6'>
						<h3 class='text-lg font-semibold mb-2'>Информация о заказе</h3>
						<p>
							<strong>ID заказа:</strong> {currentOrder()!.id}
						</p>
						<p>
							<strong>Описание:</strong> {currentOrder()!.description}
						</p>
						<p>
							<strong>Категория:</strong> {currentOrder()!.category.name}
						</p>
						<p>
							<strong>Статус:</strong>{' '}
							{currentOrder()!.accepted ? 'Принят' : 'Ожидает подтверждения'}
						</p>
						<p>
							<strong>Адрес:</strong>{' '}
							{`${currentOrder()!.address.cityName}, ${
								currentOrder()!.address.streetName
							} ${currentOrder()!.address.buildingNumber}`}
						</p>
					</div>
				</Show>

				<button
					class='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
					onClick={handleConfirm}
				>
					ПОДТВЕРЖДАЮ ВЫБОР ЗАКАЗА
				</button>
			</Show>
		</div>
	)
}
