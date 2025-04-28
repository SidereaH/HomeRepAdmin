import { createResource, createSignal, For, Show } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { Category } from '../../../types/orders'
import { ordersApi } from '../../../features/orderservice/ordersapi'
import CreateCategoryModal from './CreateCategoryModal'

export default function CategoriesList() {
	const [categories, { refetch }] = createResource(ordersApi.getAllCategories)
	const [showModal, setShowModal] = createSignal(false)
	const [error, setError] = createSignal('')
	const navigate = useNavigate()

	const handleCreate = async (category: Omit<Category, 'id'>) => {
		try {
			await ordersApi.createCategory(category)
			setShowModal(false)
			await refetch()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to create category')
		}
	}

	return (
		<div class='container mx-auto px-4 py-8'>
			<div class='flex justify-between items-center mb-6'>
				<h1 class='text-2xl font-bold'>Categories</h1>
				<button
					onClick={() => setShowModal(true)}
					class='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
				>
					+ Add Category
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
								Name
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Description
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Best Employee
							</th>
						</tr>
					</thead>
					<tbody class='bg-white divide-y divide-gray-200'>
						<For each={categories()}>
							{category => (
								<tr class='hover:bg-gray-50'>
									<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{category.id}
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
										{category.name}
									</td>
									<td class='px-6 py-4 text-sm text-gray-500'>
										{category.description || '-'}
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{category.bestEmployeeId || '-'}
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</div>

			<Show when={showModal()}>
				<CreateCategoryModal
					onClose={() => setShowModal(false)}
					onCreate={handleCreate}
				/>
			</Show>
		</div>
	)
}
