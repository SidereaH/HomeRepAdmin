import { Navigate, Route } from '@solidjs/router'
import { Component, Show } from 'solid-js'

export const ProtectedRoute: Component<{
	path: string
	component: Component
}> = props => {
	const hasToken = () => !!localStorage.getItem('accessToken')

	return (
		<Show when={hasToken()} fallback={<Navigate href='/login' />}>
			<Route path={props.path} component={props.component} />
		</Show>
	)
}
