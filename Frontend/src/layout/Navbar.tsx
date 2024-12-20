import { Bell, LogOut, UserCircleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TermsDialog } from "@/Login/TermsDialog";
import Notifications from "@/Notifications/Notifications";
import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import { onLogout, useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import { accountNavItems } from "./NavItems";

export default function Navbar() {
	const { user } = useLoginStore();
	const navigate = useNavigate();

	const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
	const closeTermsDialog = () => setIsTermsDialogOpen(false);

	const isLoggedIn = user?._id;
	const navItems = accountNavItems[user?.type ?? EAccountType.Guest];

	useEffect(() => {
		if (
			(user?.type == EAccountType.Advertiser ||
				user?.type == EAccountType.Guide ||
				user?.type == EAccountType.Seller ||
				user?.type == EAccountType.TransportationAdvertiser) &&
			!user.acceptedTerms
		) {
			setIsTermsDialogOpen(true);
		}
	}, [user]);

	const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
	const notificationsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			if (
				notificationsRef.current &&
				!notificationsRef.current.contains(event.target as Node) &&
				!target.closest(".bell-button")
			) {
				setIsNotificationsVisible(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleBellClick = () => {
		setIsNotificationsVisible((prev) => !prev);
	};

	return (
		<nav className="bg-surface-secondary h-20 z-10 flex justify-between items-center px-4 drop-shadow-2xl border-b-2 border-black">
			<Flex>
				<Link
					to="/"
					className="text-primary hover:no-underline hover:text-primary font-[pacifico]"
				>
					<Label.Big700 variant="primary">Atlas Gateway</Label.Big700>
				</Link>
			</Flex>
			{(!user || user?.isVerified) && <Flex gap="4">{navItems}</Flex>}
			{isLoggedIn ? (
				<Flex gap="2" align="center">
					<Flex
						className="cursor-pointer rounded-full w-14 h-14 bg-surface-primary"
						align="center"
						justify="center"
					>
						<Bell
							className="cursor-pointer bell-button"
							width={40}
							height={40}
							onClick={handleBellClick}
						/>

						{isNotificationsVisible && (
							<div
								className="absolute right-24 top-24 z-10"
								ref={notificationsRef}
							>
								<Notifications />
							</div>
						)}
					</Flex>
					<Link
						to={
							user.type == EAccountType.Admin
								? "/admin"
								: "/profile"
						}
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
							navigate("/");
							window.location.reload();
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
			<TermsDialog isOpen={isTermsDialogOpen} close={closeTermsDialog} />
		</nav>
	);
}
