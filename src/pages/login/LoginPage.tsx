// LoginPage.tsx
import { LoginForm } from '../../features/auth/LoginForm'

const LoginPage = () => {
	return (
		<div class='min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4'>
			<div class='w-full max-w-md'>
				<div class='bg-white rounded-xl shadow-2xl p-8 sm:p-10'>
					<div class='text-center mb-8'>
						<div class='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4'>
							<svg
								class='h-6 w-6 text-blue-600'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
								/>
							</svg>
						</div>
						<h1 class='text-3xl font-extrabold text-gray-900'>
							Вход в HomeAdmin
						</h1>
						<p class='mt-2 text-sm text-gray-600'>
							Введите свои данные для входа в систему в качестве администратора
						</p>
					</div>
					<LoginForm />
				</div>
				<div class='mt-6 text-center text-sm text-gray-500'>
					© {new Date().getFullYear()} Все права защищены
				</div>
			</div>
		</div>
	)
}

export default LoginPage
