import { useParams, useNavigate } from '@solidjs/router'
import { createEffect, Show } from 'solid-js'
import { useOrders } from '../../../hooks/useOrders'
import Spinner from '../../../components/ui/Spinner'

export default function OrderDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { orders, currentOrder, setCurrentOrder, refetchOrders } = useOrders()

	createEffect(() => {
		if (!orders.loading) {
			const order = orders()?.find(o => o.id === Number(id))
			if (order) {
				setCurrentOrder(order)
			}
		}
	})

	return (
		<div class='container mx-auto px-4 py-8'>
			<button
				onClick={() => navigate('/orders')}
				class='mb-4 text-blue-600 hover:underline'
			>
				← Back to Orders
			</button>

			<Show when={!orders.loading && currentOrder()} fallback={<Spinner />}>
				{order => {
					const o = order() // Вызов Accessor

					return (
						<div class='bg-white p-6 rounded shadow space-y-4'>
							<h2 class='text-2xl font-bold mb-4'>Order #{o.id}</h2>

							<div>
								<span class='font-medium'>Description:</span> {o.description}
							</div>

							<div>
								<span class='font-medium'>Category:</span> {o.category.name}
							</div>

							<div>
								<span class='font-medium'>Status:</span>{' '}
								<span
									class={`px-2 py-1 rounded-full text-sm ${
										o.accepted
											? 'bg-green-100 text-green-800'
											: 'bg-yellow-100 text-yellow-800'
									}`}
								>
									{o.accepted ? 'Accepted' : 'Pending'}
								</span>
							</div>

							<div>
								<span class='font-medium'>Payment Type:</span>{' '}
								{o.paymentType.name}
							</div>

							<div>
								<span class='font-medium'>Address:</span>{' '}
								{`${o.address.cityName}, ${o.address.streetName} ${o.address.buildingNumber}`}
							</div>

							<Show when={o.employeeId}>
								<div>
									<span class='font-medium'>Assigned Employee ID:</span>{' '}
									{o.employeeId}
								</div>
							</Show>

							<Show when={o.createdAt}>
								<div class='text-sm text-gray-500'>
									Created at: {new Date(o.createdAt!).toLocaleString()}
								</div>
							</Show>
							<Show when={o.updatedAt}>
								<div class='text-sm text-gray-500'>
									Last updated: {new Date(o.updatedAt!).toLocaleString()}
								</div>
							</Show>
						</div>
					)
				}}
			</Show>
		</div>
	)
}
