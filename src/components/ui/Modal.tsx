import { JSX, Show } from 'solid-js'

interface ModalProps {
	show: boolean
	onClose: () => void
	children: JSX.Element
}

export default function Modal(props: ModalProps) {
	return (
		<Show when={props.show}>
			<div class='fixed inset-0 z-50 overflow-y-auto'>
				<div class='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<div class='fixed inset-0 transition-opacity' onClick={props.onClose}>
						<div class='absolute inset-0 bg-gray-500 opacity-75'></div>
					</div>
					<span class='hidden sm:inline-block sm:align-middle sm:h-screen'>
						&#8203;
					</span>
					<div class='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
						<div class='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
							{props.children}
						</div>
					</div>
				</div>
			</div>
		</Show>
	)
}
