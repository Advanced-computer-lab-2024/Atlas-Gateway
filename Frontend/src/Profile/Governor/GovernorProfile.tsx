
import { Flex } from "@/components/ui/flex";

import profile_background from "../../assets/profile_background.jpg";
import Account from "./Tabs/Account";

const General = () => {
	return (
		<Flex isColumn className="w-full pt-6" gap="20">
			<div className="relative w-full">
				<div
					className="w-full h-64 bg-cover bg-center rounded-lg"
					style={{
						backgroundImage: `url(${profile_background})`,
					}}
				/>
				<div className="absolute left-36 -bottom-16 w-48 h-48 rounded-full overflow-hidden border-4 border-white focus:outline-none group">
					<img
						src={profile_background}
						alt="Profile"
						className="object-cover w-full h-full"
					/>
				</div>
			</div>
			<Flex
				isColumn
				className="px-4 w-full border border-black p-3 rounded-lg min-h-[500px] overflow-y-scroll"
			>
				<Account />
			</Flex>
		</Flex>
	);
};

export default General;
