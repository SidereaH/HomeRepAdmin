import { Component } from 'solid-js'
import { Navigate, Route, Router } from '@solidjs/router'
import LoginPage from './pages/login/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import UsersList from './pages/dashboard/users/UsersList'
import EditUser from './pages/dashboard/users/EditUser'
import OrdersList from './pages/dashboard/orders/OrderList'
import OrderForm from './pages/dashboard/orders/OrderForm'
import CategoriesList from './pages/dashboard/orders/CategoriesList'
import PaymentTypes from './pages/dashboard/orders/PaymentTypesList'
import DashboardPage from './pages/dashboard/DashboadrPage'

const App: Component = () => {
	return (
		<Router>
			<Route path='/login' component={LoginPage} />
			{/* <ProtectedRoute path='/dashboard' component={DashboardPage} /> */}
			<ProtectedRoute path='/dashboard' component={DashboardPage} />
			<Route path='/hello-world' component={() => <h1>Hello World!</h1>} />
			<ProtectedRoute path='/users' component={UsersList} />
			<ProtectedRoute path='/users/:id?' component={EditUser} />
			<ProtectedRoute path='/users/:id/edit' component={EditUser} />

			<ProtectedRoute path='/orders' component={OrdersList} />
			<ProtectedRoute path='/orders/new' component={OrderForm} />
			{/* <ProtectedRoute path='/orders/:id' component={OrderDetais} /> */}
			<ProtectedRoute path='/orders/:id/edit' component={OrderForm} />
			<ProtectedRoute path='/orders/categories' component={CategoriesList} />
			<ProtectedRoute path='/orders/payments' component={PaymentTypes} />

			{/* Редирект с корня */}
			<Route path='/' component={() => <Navigate href='/dashboard' />} />
		</Router>
	)
}

export default App
