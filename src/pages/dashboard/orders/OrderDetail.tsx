import { Navigate, useNavigate, useParams } from '@solidjs/router'
import { createEffect, createSignal, Show } from 'solid-js'
import { useOrders } from '../../../hooks/useOrders'
import Spinner from '../../../components/ui/Spinner'

const OrderDetail = () => {
	const params = useParams()
	const {
		currentOrder,
		fetchOrderById,
		setCurrentOrder,
		assignWorker,
		foundWorker,
	} = useOrders()
	createEffect(() => {
		if (params.id) {
			fetchOrderById(Number(params.id))
		} else {
			setCurrentOrder(null)
		}
	})
	const navigate = useNavigate()

	// Функция для безопасного отображения координат
	const formatCoordinates = (lat: number | null, lng: number | null) => {
		if (lat === null || lng === null) return 'Not specified'
		return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
	}

	return (
		<div class='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
			<div class='max-w-3xl mx-auto'>
				<div class='bg-white shadow overflow-hidden sm:rounded-lg'>
					<Show
						when={currentOrder()}
						fallback={
							<div class='flex justify-center items-center p-12'>
								<Spinner size='lg' />
							</div>
						}
					>
						{order => (
							<>
								<div class='px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-500 to-indigo-600'>
									<h1 class='text-2xl font-bold text-white'>
										Order #{order().id}
									</h1>
									<p class='mt-1 text-sm text-blue-100'>
										Created at:{' '}
										{new Date(order().createdAt || '').toLocaleString()}
									</p>
								</div>

								<div class='border-t border-gray-200 px-4 py-5 sm:p-0'>
									<dl class='sm:divide-y sm:divide-gray-200'>
										{/* Основная информация */}
										<div class='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<dt class='text-sm font-medium text-gray-500'>
												Description
											</dt>
											<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
												{order().description || 'No description'}
											</dd>
										</div>

										{/* Статус */}
										<div class='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<dt class='text-sm font-medium text-gray-500'>Status</dt>
											<dd class='mt-1 text-sm sm:mt-0 sm:col-span-2'>
												<span
													class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
														order().accepted
															? 'bg-green-100 text-green-800'
															: 'bg-yellow-100 text-yellow-800'
													}`}
												>
													{order().accepted ? 'Accepted' : 'Pending'}
												</span>
											</dd>
										</div>

										{/* Категория */}
										<div class='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<dt class='text-sm font-medium text-gray-500'>
												Category
											</dt>
											<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
												{order().category?.name || 'Not specified'}
											</dd>
										</div>

										{/* Способ оплаты */}
										<div class='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<dt class='text-sm font-medium text-gray-500'>
												Payment Method
											</dt>
											<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
												{order().paymentType?.name || 'Not specified'}
											</dd>
										</div>

										{/* Адрес */}
										<div class='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
											<dt class='text-sm font-medium text-gray-500'>Address</dt>
											<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
												{order().address?.streetName || 'Street not specified'}{' '}
												{order().address?.buildingNumber || ''}
												{order().address?.apartmentNumber &&
													`, apt. ${order().address.apartmentNumber}`}
												<br />
												{order().address?.cityName || 'City not specified'}
												<div class='mt-2 text-xs text-gray-500'>
													Coordinates:{' '}
													{formatCoordinates(
														order().address?.latitude,
														order().address?.longitude
													)}
												</div>
											</dd>
										</div>
									</dl>
								</div>

								<div class='px-4 py-4 bg-gray-50 flex justify-end space-x-3'>
									<button
										type='button'
										class='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
										onClick={() => navigate(`/orders/${order().id}/edit`)}
									>
										Edit Order
									</button>
									{/* <button
										type='button'
										class='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Assign Worker
									</button> */}
								</div>
							</>
						)}
					</Show>
				</div>
			</div>
		</div>
	)
}

export default OrderDetail
