import { For, createSignal, Show } from 'solid-js'
import { useOrders } from '../../../hooks/useOrders'
import { PaymentStatusParams } from '../../../types/orders'
import Modal from '../../../components/ui/Modal'
export default function PaymentTypes() {
	const {
		payments,
		createPayment,
		activatePayment,
		deactivatePayment,
		deletePayment,
		refetchPayments,
	} = useOrders()

	const [showModal, setShowModal] = createSignal(false)
	const [newPayment, setNewPayment] = createSignal({
		name: '',
		description: '',
		isActive: false,
	})
	const [error, setError] = createSignal('')
	const [loading, setLoading] = createSignal(false)
	const [actionLoading, setActionLoading] = createSignal<string | null>(null)

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setLoading(true)
		try {
			await createPayment(newPayment())
			setShowModal(false)
			await refetchPayments()
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to create payment type'
			)
		} finally {
			setLoading(false)
		}
	}

	const handleActivate = async (name: string) => {
		setActionLoading(`activate-${name}`)
		try {
			let namest: PaymentStatusParams = {
				paymentName: name,
			}
			await activatePayment(namest)
			await refetchPayments()
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to activate payment'
			)
		} finally {
			setActionLoading(null)
		}
	}

	const handleDeactivate = async (name: string) => {
		setActionLoading(`deactivate-${name}`)
		try {
			let namest: PaymentStatusParams = {
				paymentName: name,
			}
			await deactivatePayment(namest)
			await refetchPayments()
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to deactivate payment'
			)
		} finally {
			setActionLoading(null)
		}
	}

	const handleDelete = async (name: string) => {
		if (!confirm('Are you sure you want to delete this payment type?')) return
		setActionLoading(`delete-${name}`)
		try {
			let namest: PaymentStatusParams = {
				paymentName: name,
			}
			await deletePayment(namest)
			await refetchPayments()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to delete payment')
		} finally {
			setActionLoading(null)
		}
	}

	return (
		<div class='container mx-auto px-4 py-8'>
			<div class='flex justify-between items-center mb-6'>
				<h1 class='text-2xl font-bold'>Payment Types</h1>
				<button
					onClick={() => setShowModal(true)}
					class='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
				>
					Add Payment Type
				</button>
			</div>

			<Show when={error()}>
				<div class='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error()}</div>
			</Show>

			<div class='bg-white shadow rounded-lg overflow-hidden'>
				<table class='min-w-full divide-y divide-gray-200'>
					<thead class='bg-gray-50'>
						<tr>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
								Name
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
								Description
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
								Status
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody class='bg-white divide-y divide-gray-200'>
						<For each={payments()}>
							{payment => (
								<tr class='hover:bg-gray-50'>
									<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
										{payment.name}
									</td>
									<td class='px-6 py-4 text-sm text-gray-500'>
										{payment.description}
									</td>
									<td class='px-6 py-4 whitespace-nowrap'>
										<span
											class={`px-2 py-1 text-xs rounded-full ${
												payment.isActive
													? 'bg-green-100 text-green-800'
													: 'bg-red-100 text-red-800'
											}`}
										>
											{payment.isActive ? 'Active' : 'Inactive'}
										</span>
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
										{payment.isActive ? (
											<button
												onClick={() => handleDeactivate(payment.name)}
												disabled={!!actionLoading()}
												class='text-yellow-600 hover:text-yellow-900 disabled:opacity-50'
											>
												{actionLoading() === `deactivate-${payment.name}`
													? '...'
													: 'Deactivate'}
											</button>
										) : (
											<button
												onClick={() => handleActivate(payment.name)}
												disabled={!!actionLoading()}
												class='text-green-600 hover:text-green-900 disabled:opacity-50'
											>
												{actionLoading() === `activate-${payment.name}`
													? '...'
													: 'Activate'}
											</button>
										)}
										<button
											onClick={() => handleDelete(payment.name)}
											disabled={!!actionLoading()}
											class='text-red-600 hover:text-red-900 disabled:opacity-50'
										>
											{actionLoading() === `delete-${payment.name}`
												? '...'
												: 'Delete'}
										</button>
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</div>

			<Modal show={showModal()} onClose={() => setShowModal(false)}>
				<h2 class='text-xl font-bold mb-4'>Add New Payment Type</h2>
				<form onSubmit={handleSubmit} class='space-y-4'>
					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Name *
						</label>
						<input
							type='text'
							required
							class='w-full px-3 py-2 border border-gray-300 rounded-md'
							value={newPayment().name}
							onInput={e =>
								setNewPayment({ ...newPayment(), name: e.currentTarget.value })
							}
						/>
					</div>
					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Description
						</label>
						<textarea
							class='w-full px-3 py-2 border border-gray-300 rounded-md'
							rows={3}
							value={newPayment().description}
							onInput={e =>
								setNewPayment({
									...newPayment(),
									description: e.currentTarget.value,
								})
							}
						/>
					</div>
					<div>
						<label class='flex items-center space-x-2'>
							<input
								type='checkbox'
								checked={newPayment().isActive}
								onChange={e =>
									setNewPayment({
										...newPayment(),
										isActive: e.currentTarget.checked,
									})
								}
								class='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
							/>
							<span class='text-sm text-gray-700'>Active</span>
						</label>
					</div>
					<div class='flex justify-end space-x-3'>
						<button
							type='button'
							onClick={() => setShowModal(false)}
							class='px-4 py-2 border border-gray-300 rounded-md'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={loading()}
							class='px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50'
						>
							{loading() ? 'Creating...' : 'Create'}
						</button>
					</div>
				</form>
			</Modal>
		</div>
	)
}
