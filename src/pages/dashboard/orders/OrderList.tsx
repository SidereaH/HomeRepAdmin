import { For, Show, createEffect, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { useOrders } from '../../../hooks/useOrders'
import Spinner from '../../../components/ui/Spinner'

export default function OrdersList() {
	const {
		orders,
		refetchOrders,
		foundWorker,
		assignWorker,
		findWorker,
		deleteOrder,
	} = useOrders()
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal('')
	const navigate = useNavigate()

	const handleFindWorker = async (orderId: number) => {
		setLoading(true)
		try {
			await findWorker({ orderId })
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to find worker')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id: number) => {
		if (confirm('Are you sure you want to delete this order?')) {
			await deleteOrder(id)
			await refetchOrders()
		}
	}
	const handleAssignWorker = async (orderId: number) => {
		if (!foundWorker()) return

		setLoading(true)
		try {
			await assignWorker({ orderId, workerId: foundWorker()! })
			await refetchOrders()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to assign worker')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div class='container mx-auto px-4 py-8'>
			<div class='flex justify-between items-center mb-6'>
				<h1 class='text-2xl font-bold'>Order Management</h1>
				<button
					onClick={() => navigate('/orders/new')}
					class='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
				>
					Create Order
				</button>
			</div>

			<Show when={error()}>
				<div class='bg-red-100 text-red-700 p-3 rounded mb-4'>{error()}</div>
			</Show>

			<div class='bg-white shadow rounded-lg overflow-hidden'>
				<table class='min-w-full divide-y divide-gray-200'>
					<thead class='bg-gray-50'>
						<tr>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								ID
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Description
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Category
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Status
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody class='bg-white divide-y divide-gray-200'>
						<Show when={!orders.loading} fallback={<Spinner />}>
							<For each={orders()}>
								{order => (
									<tr>
										<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{order.id}
										</td>
										<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{order.description}
										</td>
										<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{order.category.name}
										</td>
										<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											<span
												class={`px-2 py-1 rounded-full text-xs ${
													order.accepted
														? 'bg-green-100 text-green-800'
														: 'bg-yellow-100 text-yellow-800'
												}`}
											>
												{order.accepted ? 'Accepted' : 'Pending'}
											</span>
										</td>
										<td class='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
											<button
												onClick={() => navigate(`/orders/${order.id}`)}
												class='text-blue-600 hover:text-blue-900'
											>
												View
											</button>
											<button
												onClick={() => navigate(`/orders/${order.id}/edit`)}
												class='text-blue-600 hover:text-blue-900'
											>
												Edit
											</button>

											<Show when={!order.accepted}>
												<button
													onClick={() => handleFindWorker(order.id)}
													disabled={loading()}
													class='text-indigo-600 hover:text-indigo-900 disabled:opacity-50'
												>
													Find Worker
												</button>
												<Show when={foundWorker()}>
													<button
														onClick={() => handleAssignWorker(order.id)}
														disabled={loading()}
														class='text-green-600 hover:text-green-900 disabled:opacity-50'
													>
														Assign
													</button>
												</Show>
											</Show>
											<button
												onClick={() => handleDelete(order.id)}
												disabled={loading()}
												class='text-green-600 hover:text-green-900 disabled:opacity-50'
											>
												Delete
											</button>
										</td>
									</tr>
								)}
							</For>
						</Show>
					</tbody>
				</table>
			</div>
		</div>
	)
}
