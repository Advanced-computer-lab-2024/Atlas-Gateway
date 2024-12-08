import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useCreatePromoCode, usePromoCodes } from "@/api/data/usePromo";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { TPromo } from "@/types/global";

import { PromoCodeSchema } from "./schema";

const PromoSheet = () => {
	const formMethods = useForm<z.infer<typeof PromoCodeSchema>>({
		resolver: zodResolver(PromoCodeSchema),
		defaultValues: {
			expiryDate: new Date().toString(),
		},
	});
	const { handleSubmit, control } = formMethods;
	const { refetch } = usePromoCodes();
	const { doCreatePromoCode } = useCreatePromoCode(() => {
		refetch();
	});
	const onSubmit = (data: Partial<TPromo>) => {
		doCreatePromoCode({ ...data, allUsers: true });
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Create Promo Code</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create promo Code</SheetTitle>
					<SheetDescription>
						Add Promo Code details here.
					</SheetDescription>
				</SheetHeader>
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name="discountPercentage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>discount Percentage</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter discount Percentage"
											type="number"
											{...field}
											onChange={(e) =>
												field.onChange(
													parseInt(e.target.value),
												)
											}
											className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
										/>
									</FormControl>
									<FormDescription>
										Enter discount Percentage.
									</FormDescription>
								</FormItem>
							)}
						/>
						{/* <FormField
							control={control}
							name="allUsers"
							render={({ field }) => (
								<FormItem>
									<FormLabel>allUsers</FormLabel>
									<FormControl>
										<input
											type="checkbox"
											id={field.name}
											checked={field.value}
											onChange={field.onChange}
											ref={field.ref}
										/>
									</FormControl>
									<FormDescription>
										is it allowed for all users?.
									</FormDescription>
								</FormItem>
							)}
						/> */}
						<FormField
							control={control}
							name="expiryDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>expiryDate</FormLabel>
									<FormControl>
										<DateTimePicker
											date={new Date(field?.value)}
											setDate={(date) =>
												field.onChange(date?.toString())
											}
										/>
									</FormControl>
									<FormDescription>
										Enter expiryDate
									</FormDescription>
								</FormItem>
							)}
						/>
						<SheetFooter>
							<SheetClose asChild>
								<Button type="submit">Save changes</Button>
							</SheetClose>
						</SheetFooter>
					</form>
				</FormProvider>
			</SheetContent>
		</Sheet>
	);
};

export default PromoSheet;
