import { Binoculars, Bus, HandCoins, Map, Megaphone } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

import Label from "@/components/ui/Label";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";
import { EAccountType } from "@/types/enums";

import { TRegisterForm } from "../types";

const accountTypes = [
	{ label: "Tourist", value: EAccountType.Tourist, icon: <Binoculars /> },
	{ label: "Guide", value: EAccountType.Guide, icon: <Map /> },
	{ label: "Seller", value: EAccountType.Seller, icon: <HandCoins /> },
	{
		label: "Advertiser",
		value: EAccountType.Advertiser,
		icon: <Megaphone />,
	},
	{
		label: "Transportation Advertiser",
		value: EAccountType.TransportationAdvertiser,
		icon: <Bus />,
	},
];

export default function AccountType() {
	const form = useFormContext<TRegisterForm>();

	return (
		<>
			{accountTypes.map((type) => (
				<Flex
					key={type.value}
					className={cn(
						"rounded-md w-full h-24 items-center justify-center border bg-card cursor-pointer border-black",
						{
							"bg-gray-300": form?.watch("type") === type.value,
						},
					)}
					onClick={() => {
						form?.setValue("type", type.value);
					}}
					gap="2"
				>
					<Label.Mid500>{type.label}</Label.Mid500>
					{type.icon}
				</Flex>
			))}
			<p className={"text-[0.8rem] font-medium text-destructive h-5"}>
				{form?.formState.errors.type?.message}
			</p>
			<Flex gap="1">
				Already have an account?{" "}
				<Link to="/login" className="text-primary">
					Login
				</Link>
			</Flex>
		</>
	);
}
