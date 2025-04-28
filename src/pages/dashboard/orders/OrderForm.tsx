import { Component, createEffect, createSignal, Show, For } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'
import { useOrders } from '../../../hooks/useOrders'
import { Order } from '../../../types/orders'
import Spinner from '../../../components/ui/Spinner'

const OrderForm: Component = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { currentOrder, categories, payments, createOrder, updateOrder } =
		useOrders()

	const [form, setForm] = createSignal<Partial<Order>>({})
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal('')

	createEffect(() => {
		if (params.id && currentOrder()) {
			setForm(currentOrder()!)
		} else {
			setForm({
				description: '',
				accepted: false,
				address: {
					streetName: '',
					buildingNumber: '',
					apartmentNumber: '',
					cityName: '',
					longitude: 0,
					latitude: 0,
				},
				paymentType: payments()?.[0],
				category: categories()?.[0],
			})
		}
	})

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setLoading(true)

		try {
			if (params.id) {
				await updateOrder(Number(params.id), form() as Order)
			} else {
				await createOrder(form() as Omit<Order, 'id'>)
			}
			navigate('/orders')
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to save order')
		} finally {
			setLoading(false)
		}
	}

	const handleAddressChange = (
		field: keyof Order['address'],
		value: string | number
	) => {
		setForm({
			...form(),
			address: {
				...form()?.address!,
				[field]: value,
			},
		})
	}

	return (
		<div class='container mx-auto px-4 py-8'>
			<h1 class='text-2xl font-bold mb-6'>
				{params.id ? 'Edit Order' : 'Create New Order'}
			</h1>

			<Show when={error()}>
				<div class='bg-red-100 text-red-700 p-3 rounded mb-4'>{error()}</div>
			</Show>

			<form onSubmit={handleSubmit} class='space-y-6'>
				<div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Основная информация */}
					<div class='space-y-4'>
						<div>
							<label class='block text-sm font-medium text-gray-700 mb-1'>
								Description *
							</label>
							<textarea
								value={form()?.description || ''}
								onInput={e =>
									setForm({ ...form(), description: e.currentTarget.value })
								}
								class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								rows={3}
								required
							/>
						</div>

						<div>
							<label class='block text-sm font-medium text-gray-700 mb-1'>
								Category *
							</label>
							<select
								value={form()?.category?.id}
								onChange={e => {
									const category = categories()?.find(
										c => c.id === Number(e.currentTarget.value)
									)
									if (category) setForm({ ...form(), category })
								}}
								class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								required
							>
								<For each={categories()}>
									{category => (
										<option value={category.id}>{category.name}</option>
									)}
								</For>
							</select>
						</div>

						<div>
							<label class='block text-sm font-medium text-gray-700 mb-1'>
								Payment Type *
							</label>
							<select
								value={form()?.paymentType?.id}
								onChange={e => {
									const payment = payments()?.find(
										p => p.id === Number(e.currentTarget.value)
									)
									if (payment) setForm({ ...form(), paymentType: payment })
								}}
								class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								required
							>
								<For each={payments()}>
									{payment => (
										<option value={payment.id}>{payment.name}</option>
									)}
								</For>
							</select>
						</div>

						<div class='flex items-center'>
							<input
								id='accepted'
								type='checkbox'
								checked={form()?.accepted || false}
								onChange={e =>
									setForm({ ...form(), accepted: e.currentTarget.checked })
								}
								class='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
							/>
							<label for='accepted' class='ml-2 block text-sm text-gray-700'>
								Order Accepted
							</label>
						</div>
					</div>

					{/* Адрес */}
					<div class='space-y-4'>
						<h3 class='text-lg font-medium text-gray-900'>
							Address Information
						</h3>

						<div>
							<label class='block text-sm font-medium text-gray-700 mb-1'>
								Street Name *
							</label>
							<input
								type='text'
								value={form()?.address?.streetName || ''}
								onInput={e =>
									handleAddressChange('streetName', e.currentTarget.value)
								}
								class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>

						<div class='grid grid-cols-2 gap-4'>
							<div>
								<label class='block text-sm font-medium text-gray-700 mb-1'>
									Building Number *
								</label>
								<input
									type='text'
									value={form()?.address?.buildingNumber || ''}
									onInput={e =>
										handleAddressChange('buildingNumber', e.currentTarget.value)
									}
									class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
									required
								/>
							</div>

							<div>
								<label class='block text-sm font-medium text-gray-700 mb-1'>
									Apartment Number
								</label>
								<input
									type='text'
									value={form()?.address?.apartmentNumber || ''}
									onInput={e =>
										handleAddressChange(
											'apartmentNumber',
											e.currentTarget.value
										)
									}
									class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								/>
							</div>
						</div>

						<div>
							<label class='block text-sm font-medium text-gray-700 mb-1'>
								City *
							</label>
							<input
								type='text'
								value={form()?.address?.cityName || ''}
								onInput={e =>
									handleAddressChange('cityName', e.currentTarget.value)
								}
								class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>

						<div class='grid grid-cols-2 gap-4'>
							<div>
								<label class='block text-sm font-medium text-gray-700 mb-1'>
									Latitude *
								</label>
								<input
									type='number'
									step='0.000001'
									value={form()?.address?.latitude || 0}
									onInput={e =>
										handleAddressChange(
											'latitude',
											parseFloat(e.currentTarget.value)
										)
									}
									class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
									required
								/>
							</div>

							<div>
								<label class='block text-sm font-medium text-gray-700 mb-1'>
									Longitude *
								</label>
								<input
									type='number'
									step='0.000001'
									value={form()?.address?.longitude || 0}
									onInput={e =>
										handleAddressChange(
											'longitude',
											parseFloat(e.currentTarget.value)
										)
									}
									class='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
									required
								/>
							</div>
						</div>
					</div>
				</div>

				<div class='flex justify-end space-x-3'>
					<button
						type='button'
						onClick={() => navigate('/orders')}
						class='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
					>
						Cancel
					</button>
					<button
						type='submit'
						disabled={loading()}
						class='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
					>
						{loading() ? <Spinner size='sm' /> : 'Save'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default OrderForm
