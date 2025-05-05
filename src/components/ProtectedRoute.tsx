// src/components/ProtectedRoute.tsx
import { Navigate, Route } from '@solidjs/router'
import { Component, Show } from 'solid-js'
// import { auth } from '../stores/authStore'

export const ProtectedRoute: Component<{
	path: string
	component: Component
}> = props => {
	const hasToken = () => !!localStorage.getItem('accessToken')
	console.log(hasToken)
	return (
		<Route
			path={props.path}
			component={() => (
				<Show when={hasToken()} fallback={<Navigate href='/login' />}>
					<props.component />
				</Show>
			)}
		/>
	)
}
