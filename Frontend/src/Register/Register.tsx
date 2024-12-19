import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useRegister } from "@/api/data";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { Form } from "@/components/ui/form";
import { EAccountType } from "@/types/enums";

import AccountInfo from "./components/AccountInfo";
import AccountType from "./components/AccountType";
import TouristInfo from "./components/TouristInfo";
import {
	accountInfoSchema,
	accountTypeSchema,
	touristInfoSchema,
} from "./schema";
import { TRegisterForm } from "./types";

const schemaMap = {
	1: accountTypeSchema,
	2: touristInfoSchema,
	3: accountInfoSchema,
};

const componentMap = {
	1: <AccountType />,
	2: <TouristInfo />,
	3: <AccountInfo />,
};

const stageTitleMap = {
	1: "Register as",
	2: "Tourist registration",
	3: "Account information",
};

export default function Register() {
	const [stage, setStage] = useState<1 | 2 | 3>(1);

	const { doRegister } = useRegister();

	const form = useForm<TRegisterForm>({
		resolver: zodResolver(schemaMap[stage]),
		mode: "onChange",
	});

	const { handleSubmit, watch, getValues } = form;

	const selectedType = watch("type");

	const onSubmit = async () => {
		switch (stage) {
			case 1:
				if (selectedType !== EAccountType.Tourist) {
					setStage(3);
				} else {
					setStage(2);
				}
				return;
			case 2:
				setStage(3);
				return;
			case 3:
				doRegister(getValues());
				return;
		}
	};

	const onBackButtonClick = useCallback(() => {
		switch (stage) {
			case 3:
				if (selectedType !== EAccountType.Tourist) {
					setStage(1);
				} else {
					setStage(2);
				}
				return;
			case 2:
				setStage(1);
				return;
		}
	}, [stage, setStage, selectedType]);

	return (
		<div className="grid place-items-center items-center place-content-center w-full h-full">
			<Card className="w-[500px] h-[700px] rounded-lg border-black shadow-xl">
				<CardHeader className="items-center">
					<Label.Big600>{stageTitleMap[stage]}</Label.Big600>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<Flex isColumn gap="5" className="h-[500px]">
								{componentMap[stage]}
							</Flex>
							<Flex justify="center" align="center" gap="4">
								{stage !== 1 && (
									<Button
										onClick={onBackButtonClick}
										variant="outline"
										size="lg"
										type="button"
									>
										Back
									</Button>
								)}
								<Button size="lg" type="submit">
									{stage === 3 ? "Register" : "Next"}
								</Button>
							</Flex>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
