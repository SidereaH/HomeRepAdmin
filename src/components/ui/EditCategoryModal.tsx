import { createSignal, Show } from 'solid-js'
import { Category } from '../../types/orders'

export default function EditCategoryModal(props: {
	category: Category
	onClose: () => void
	onSave: (data: Omit<Category, 'id'>) => Promise<void>
}) {
	const [name, setName] = createSignal(props.category.name)
	const [description, setDescription] = createSignal(props.category.description)
	const [error, setError] = createSignal('')

	const handleSave = async () => {
		try {
			await props.onSave({
				name: name(),
				description: description(),
				bestEmployeeId: props.category.bestEmployeeId || undefined,
			})
			props.onClose()
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Failed to update category')
		}
	}

	return (
		<div class='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
			<div class='bg-white p-6 rounded shadow-md w-full max-w-md'>
				<h2 class='text-xl font-bold mb-4'>Edit Category</h2>

				<Show when={error()}>
					<div class='text-red-600 text-sm mb-2'>{error()}</div>
				</Show>

				<div class='mb-4'>
					<label class='block text-sm font-medium mb-1'>Name</label>
					<input
						value={name()}
						onInput={e => setName(e.currentTarget.value)}
						class='w-full border px-3 py-2 rounded'
					/>
				</div>

				<div class='mb-4'>
					<label class='block text-sm font-medium mb-1'>Description</label>
					<textarea
						value={description()}
						onInput={e => setDescription(e.currentTarget.value)}
						class='w-full border px-3 py-2 rounded'
					/>
				</div>

				<div class='flex justify-end space-x-2'>
					<button onClick={props.onClose} class='text-gray-600'>
						Cancel
					</button>
					<button
						onClick={handleSave}
						class='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
					>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}
