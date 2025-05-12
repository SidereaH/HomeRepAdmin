import { JSX, Show } from 'solid-js'

interface ModalProps {
	show: boolean
	onClose: () => void
	children: JSX.Element
}

export default function Modal(props: ModalProps) {
	return (
		<Show when={props.show}>
			<div class='fixed inset-0 z-50 flex items-center justify-center'>
				{/* Красивое полупрозрачное затемнение */}
				<div
					class='absolute inset-0 bg-black/30 transition-opacity duration-200'
					onClick={props.onClose}
				/>

				{/* Контент модалки */}
				<div class='relative z-50 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in'>
					{props.children}
				</div>
			</div>
		</Show>
	)
}
