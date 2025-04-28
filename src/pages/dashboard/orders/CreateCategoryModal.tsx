import { Component, createSignal } from 'solid-js'
import { Category } from '../../../types/orders'

interface Props {
	onClose: () => void
	onCreate: (category: Omit<Category, 'id'>) => void
}

const CreateCategoryModal: Component<Props> = props => {
	const [form, setForm] = createSignal<Omit<Category, 'id'>>({
		name: '',
		description: '',
		bestEmployeeId: undefined,
	})

	const handleSubmit = (e: Event) => {
		e.preventDefault()
		props.onCreate(form())
	}

	return (
		<div class='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
			<div class='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
				<div class='flex justify-between items-center mb-4'>
					<h2 class='text-xl font-bold'>Create New Category</h2>
					<button
						onClick={props.onClose}
						class='text-gray-500 hover:text-gray-700'
					>
						&times;
					</button>
				</div>

				<form onSubmit={handleSubmit} class='space-y-4'>
					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Name *
						</label>
						<input
							type='text'
							required
							class='w-full px-3 py-2 border border-gray-300 rounded-md'
							value={form().name}
							onInput={e => setForm({ ...form(), name: e.currentTarget.value })}
						/>
					</div>

					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Description
						</label>
						<textarea
							class='w-full px-3 py-2 border border-gray-300 rounded-md'
							rows={3}
							value={form().description}
							onInput={e =>
								setForm({ ...form(), description: e.currentTarget.value })
							}
						/>
					</div>

					<div>
						<label class='block text-sm font-medium text-gray-700 mb-1'>
							Best Employee ID
						</label>
						<input
							type='number'
							class='w-full px-3 py-2 border border-gray-300 rounded-md'
							value={form().bestEmployeeId || ''}
							onInput={e =>
								setForm({
									...form(),
									bestEmployeeId: e.currentTarget.value
										? Number(e.currentTarget.value)
										: undefined,
								})
							}
						/>
					</div>

					<div class='flex justify-end space-x-3 pt-4'>
						<button
							type='button'
							onClick={props.onClose}
							class='px-4 py-2 border border-gray-300 rounded-md'
						>
							Cancel
						</button>
						<button
							type='submit'
							class='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateCategoryModal
