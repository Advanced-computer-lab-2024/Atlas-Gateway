import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useRegister } from "@/api/data";
import Filters from "@/components/Filters/Filters";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
		shouldUnregister: false,
		resolver: zodResolver(schemaMap[stage]),
		mode: "onChange",
	});

	const { handleSubmit, watch } = form;

	const selectedType = watch("type");

	const onSubmit = async (data: TRegisterForm) => {
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
				doRegister(data);
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
			<Card className="w-[500px] h-[700px] rounded-lg">
				<CardHeader className="items-center">
					<Label.Big600>{stageTitleMap[stage]}</Label.Big600>
					<Filters
						filters={{
							checkbox: {
								label: "Checkbox example",
								options: [
									{
										value: "filter1",
										label: "Filter 1",
									},
									{
										value: "filter2",
										label: "Filter 2",
									},
									{
										value: "filter3",
										label: "Filter 3",
									},
									{
										value: "filter4",
										label: "Filter 4",
									},
									{
										value: "filter5",
										label: "Filter 5",
									},
									{
										value: "filter6",
										label: "Filter 6",
									},
									{
										value: "filter7",
										label: "Filter 7",
									},
									{
										value: "filter8",
										label: "Filter 8",
									},
									{
										value: "filter9",
										label: "Filter 9",
									},
									{
										value: "filter10",
										label: "Filter 10",
									},
									{
										value: "filter11",
										label: "Filter 11",
									},
									{
										value: "filter12",
										label: "Filter 12",
									},
									{
										value: "filter13",
										label: "Filter 13",
									},
									{
										value: "filter14",
										label: "Filter 14",
									},
									{
										value: "filter15",
										label: "Filter 15",
									},
									{
										value: "filter16",
										label: "Filter 16",
									},
									{
										value: "filter17",
										label: "Filter 17",
									},
									{
										value: "filter18",
										label: "Filter 18",
									},
									{
										value: "filter19",
										label: "Filter 19",
									},
									{
										value: "filter20",
										label: "Filter 20",
									},
									{
										value: "filter21",
										label: "Filter 21",
									},
									{
										value: "filter22",
										label: "Filter 22",
									},
									{
										value: "filter23",
										label: "Filter 23",
									},
									{
										value: "filter24",
										label: "Filter 24",
									},
									{
										value: "filter25",
										label: "Filter 25",
									},
									{
										value: "filter26",
										label: "Filter 26",
									},
									{
										value: "filter27",
										label: "Filter 27",
									},
									{
										value: "filter28",
										label: "Filter 28",
									},
								],
								filterName: "filter",
								type: "checkbox",
							},
							date: {
								label: "Date",
								filterName: "date",
								type: "date",
							},
							range: {
								label: "Range example",
								filterName: "range",
								type: "range",
							},
						}}
					/>
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
