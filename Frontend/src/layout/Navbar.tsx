import { Flex } from '@/components/ui/flex';
import Label from '@/components/ui/Label';
import { UserCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { accountRoutes } from './routes';

export default function Navbar() {
	const routes = accountRoutes['tourist'];

	const isLoggedIn = true;

	return (
		<nav className="bg-surface-secondary h-20 flex justify-between items-center px-4 drop-shadow-2xl border-b-2 border-black">
			<Flex>
				<Link
					to="/"
					className="text-primary hover:no-underline hover:text-primary"
				>
					<Label.Big700 variant="primary">Atlas Gateway</Label.Big700>
				</Link>
			</Flex>
			<Flex gap="2">
				{routes.map((route) => (
					<Link
						to={route.to}
						key={route.to}
						className="text-primary hover:no-underline hover:text-primary p-4"
					>
						<Label.Mid500 variant="primary">{route.name}</Label.Mid500>
					</Link>
				))}
			</Flex>
			{isLoggedIn ? (
				<Link
					to="/profile"
					className="rounded-full w-14 h-14 bg-surface-primary flex items-center justify-center text-primary hover:no-underline hover:text-primary"
				>
					<UserCircleIcon width={40} height={40} />
				</Link>
			) : (
				<Link
					to="/register"
					className="text-primary hover:no-underline hover:text-primary bg-surface-primary px-4 py-3 rounded-3xl flex items-center justify-center"
				>
					<Label.Mid400 variant="primary">Sign up/Login</Label.Mid400>
				</Link>
			)}
		</nav>
	);
}
