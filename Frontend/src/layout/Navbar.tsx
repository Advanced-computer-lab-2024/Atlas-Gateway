import { LogOut, UserCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import { onLogout, useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import { accountRoutes } from "./routes";

export default function Navbar() {
	const { user } = useLoginStore();
	const navigate = useNavigate();

	const isLoggedIn = user?._id;
	const routes = accountRoutes[(user?.type ?? "tourist") as EAccountType];

	return (
		<nav className="bg-surface-secondary h-20 flex justify-between items-center px-4 drop-shadow-2xl border-b-2 border-black">
			<Flex>
				<Link
					to="/"
					className="text-primary hover:no-underline hover:text-primary font-[pacifico]"
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
						<Label.Mid500 variant="primary">
							{route.name}
						</Label.Mid500>
					</Link>
				))}
			</Flex>
			{isLoggedIn ? (
				<Flex gap="2" align="center">
					<Link
						to="/profile"
						className="rounded-full w-14 h-14 bg-surface-primary flex items-center justify-center text-primary hover:no-underline hover:text-primary"
					>
						<UserCircleIcon width={40} height={40} />
					</Link>
					<Flex
						className="cursor-pointer rounded-full w-14 h-14 bg-surface-primary"
						align="center"
						justify="center"
						onClick={() => {
							onLogout();
							navigate("/register");
						}}
					>
						<LogOut
							className="cursor-pointer"
							width={40}
							height={40}
						/>
					</Flex>
				</Flex>
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
