import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	useAddComplaint,
	useProfileComplaints,
} from "@/api/data/useComplaints";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { TComplaint } from "@/types/global";

import { formSchema } from "./schema";

export default function AddComplaintSheet({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const { refetch } = useProfileComplaints();
	const form = useForm<TComplaint>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});
	const { formState, handleSubmit, reset } = form;

	const { doAddComplaint } = useAddComplaint(() => {
		refetch();
		reset();
		setOpen(false);
	});

	const onSubmit = (data: TComplaint) => {
		doAddComplaint(data);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<SheetHeader>
							<SheetTitle>
								<Label.Big600>New Complaint</Label.Big600>
							</SheetTitle>
							<SheetDescription>
								Were you not satisfied with the service? Let us
								know by filling out the form below.
							</SheetDescription>
						</SheetHeader>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Complaint about X service"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Complaint title.
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of the complaint</FormLabel>
									<FormControl>
										<DateTimePicker
											date={
												field?.value
													? new Date(field?.value)
													: undefined
											}
											setDate={(date) =>
												field.onChange(date?.toString())
											}
											disabled={[
												{
													after: new Date(),
												},
											]}
										/>
									</FormControl>
									<FormDescription>
										Date of the complaint.
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="body"
							render={({ field }) => (
								<FormItem>
									<FormLabel> body</FormLabel>
									<FormControl>
										<Textarea
											placeholder="I was not satisfied with the service because of..."
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Details of the complaint.
									</FormDescription>
								</FormItem>
							)}
						/>
						<SheetFooter>
							<Button
								type="submit"
								disabled={!formState.isValid}
								onClick={handleSubmit(onSubmit)}
							>
								Submit complaint
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
