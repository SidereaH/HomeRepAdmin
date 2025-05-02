import { createEffect, createSignal, For, Show } from 'solid-js'
import { useUsers } from '../../../hooks/useUsers'
import { A, useNavigate } from '@solidjs/router'
import { MapComponent } from '../../../components/ui/MapComponents'

export default function UsersList() {
	const { clients, deleteClient, refetchClients } = useUsers()
	const navigate = useNavigate()
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal('')

	const handleDelete = async (id: number) => {
		setLoading(true)
		try {
			await deleteClient(id)
			await refetchClients()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to delete user')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div class='container mx-auto px-4 py-8'>
			{/* <h1 class='text-2xl font-bold mb-6'>User Management</h1> */}

			<Show when={error()}>
				<div class='bg-red-100 text-red-700 p-3 rounded mb-4'>{error()}</div>
			</Show>

			<div class='bg-white shadow rounded-lg overflow-hidden'>
				<div class='flex justify-between items-center mb-6'>
					<h1 class='text-2xl font-bold'>User Management</h1>
					<A href='/users/new'>
						<button
							// onClick={() => navigate('/users/new')}
							class='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
						>
							+ Add New User
						</button>
					</A>
				</div>
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
								Email
							</th>
							<th class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Phone
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
						<For each={clients()}>
							{client => (
								<tr>
									<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{client.id}
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
										{client.firstName} {client.lastName}
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{client.email}
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{client.phone}
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{client.status}
									</td>
									<td class='px-6 py-4 whitespace-nowrap text-sm font-medium'>
										<button
											onClick={() => handleDelete(client.id)}
											disabled={loading()}
											class='text-red-600 hover:text-red-900 disabled:opacity-50'
										>
											Delete
										</button>
										<br />
										<A href={`/users/${client.id}`}>
											<button
												onClick={() => navigate(`/users/${client.id}/edit`)}
												disabled={loading()}
												class='text-yellow-600 hover:text-blue-900 disabled:opacity-50'
											>
												Edit
											</button>
										</A>
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</div>
			<div>
				{/* <h1>Яндекс Карты в SolidJS</h1> */}
				<MapComponent
					width='800px'
					height='500px'
					center={[37.6176, 55.7558]}
					zoom={12}
				/>
			</div>
		</div>
	)
}
