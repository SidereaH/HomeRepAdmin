import { A } from '@solidjs/router'
import { Component } from 'solid-js'

const DashboardPage: Component = () => {
	return (
		<div class='bg-gray-100 min-h-screen py-10 px-4'>
			<div class='max-w-7xl mx-auto'>
				<h1 class='text-3xl font-bold text-center text-gray-800 mb-10'>
					Админ-панель
				</h1>

				<div class='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
					<DashboardCard
						to='/users'
						title='Пользователи'
						icon='👥'
						color='from-blue-500 to-blue-400'
					/>
					<DashboardCard
						to='/orders'
						title='Заказы'
						icon='🧾'
						color='from-green-500 to-green-400'
					/>
					<DashboardCard
						to='/orders/categories'
						title='Категории заказов'
						icon='📦'
						color='from-yellow-500 to-yellow-400'
					/>
					<DashboardCard
						to='/orders/payments'
						title='Типы оплат'
						icon='💳'
						color='from-purple-500 to-purple-400'
					/>
					<DashboardCard
						to='/hello-world'
						title='Приветствие'
						icon='👋'
						color='from-pink-500 to-pink-400'
					/>
				</div>

				<div class='mt-12'>
					<h2 class='text-xl font-semibold mb-4 text-gray-700'>
						Быстрая статистика
					</h2>
					<div class='grid grid-cols-2 md:grid-cols-4 gap-4'>
						<StatCard title='Пользователей' value='124' />
						<StatCard title='Заказов' value='57' />
						<StatCard title='Выручка' value='₽ 43,000' />
						<StatCard title='Онлайн' value='3' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardPage

const DashboardCard = (props: {
	to: string
	title: string
	icon: string
	color: string // tailwind gradient color
}) => (
	<A
		href={props.to}
		class={`block p-6 rounded-xl shadow-lg text-white bg-gradient-to-br ${props.color} hover:shadow-xl transition-all duration-200`}
	>
		<div class='flex items-center space-x-4'>
			<div class='text-3xl'>{props.icon}</div>
			<div class='text-lg font-semibold'>{props.title}</div>
		</div>
	</A>
)

const StatCard = (props: { title: string; value: string }) => (
	<div class='p-4 bg-white rounded-xl shadow text-center border border-gray-100'>
		<div class='text-sm text-gray-500'>{props.title}</div>
		<div class='text-2xl font-bold text-gray-800'>{props.value}</div>
	</div>
)
