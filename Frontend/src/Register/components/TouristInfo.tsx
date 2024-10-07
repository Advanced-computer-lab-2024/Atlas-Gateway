import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { TRegisterForm } from "../types";

export default function TouristInfo() {
	const form = useFormContext<TRegisterForm>();

	return (
		<>
			<FormField
				control={form.control}
				name="mobile"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Mobile number</FormLabel>
						<FormControl>
							<Input placeholder="mobile number" {...field} />
						</FormControl>
						<FormDescription>
							This is the number that will be used to contact you.
						</FormDescription>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="nationality"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Nationality</FormLabel>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select your nationality" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="american">
									American
								</SelectItem>
								<SelectItem value="canadian">
									Canadian
								</SelectItem>
								<SelectItem value="british">British</SelectItem>
								<SelectItem value="australian">
									Australian
								</SelectItem>
								<SelectItem value="german">German</SelectItem>
								<SelectItem value="french">French</SelectItem>
								<SelectItem value="italian">Italian</SelectItem>
								<SelectItem value="spanish">Spanish</SelectItem>
								<SelectItem value="chinese">Chinese</SelectItem>
								<SelectItem value="japanese">
									Japanese
								</SelectItem>
								<SelectItem value="indian">Indian</SelectItem>
								<SelectItem value="brazilian">
									Brazilian
								</SelectItem>
								<SelectItem value="mexican">Mexican</SelectItem>
								<SelectItem value="south-african">
									South African
								</SelectItem>
								<SelectItem value="nigerian">
									Nigerian
								</SelectItem>
								<SelectItem value="russian">Russian</SelectItem>
								<SelectItem value="korean">Korean</SelectItem>
								<SelectItem value="egyptian">
									Egyptian
								</SelectItem>
								<SelectItem value="swedish">Swedish</SelectItem>
								<SelectItem value="dutch">Dutch</SelectItem>
							</SelectContent>
						</Select>
						<FormDescription>
							Select your nationality.
						</FormDescription>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="dob"
				render={({ field }) => (
					<FormItem className="flex flex-col">
						<FormLabel>Date of birth</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant="outline"
										className={cn(
											"w-full pl-3 text-left font-normal",
											!field.value &&
												"text-muted-foreground",
										)}
									>
										{field.value ? (
											format(field.value, "PPP")
										) : (
											<span>Pick a date</span>
										)}
										<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={field.value}
									onSelect={field.onChange}
									disabled={(date) =>
										date > new Date() ||
										date < new Date("1900-01-01")
									}
									captionLayout="dropdown-buttons"
									fromYear={new Date().getFullYear() - 80}
									toDate={new Date()}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<FormDescription>
							Your date of birth is used to calculate your age.
						</FormDescription>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="occupation"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Occupation</FormLabel>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select your current occupation" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="student">Student</SelectItem>
								<SelectItem value="software-engineer">
									Software Engineer
								</SelectItem>
								<SelectItem value="data-scientist">
									Data Scientist
								</SelectItem>
								<SelectItem value="teacher">Teacher</SelectItem>
								<SelectItem value="doctor">Doctor</SelectItem>
								<SelectItem value="nurse">Nurse</SelectItem>
								<SelectItem value="lawyer">Lawyer</SelectItem>
								<SelectItem value="accountant">
									Accountant
								</SelectItem>
								<SelectItem value="graphic-designer">
									Graphic Designer
								</SelectItem>
								<SelectItem value="marketing-specialist">
									Marketing Specialist
								</SelectItem>
								<SelectItem value="sales-manager">
									Sales Manager
								</SelectItem>
								<SelectItem value="product-manager">
									Product Manager
								</SelectItem>
								<SelectItem value="business-analyst">
									Business Analyst
								</SelectItem>
								<SelectItem value="financial-analyst">
									Financial Analyst
								</SelectItem>
								<SelectItem value="hr-specialist">
									HR Specialist
								</SelectItem>
								<SelectItem value="customer-support-representative">
									Customer Support Representative
								</SelectItem>
								<SelectItem value="engineer">
									Engineer
								</SelectItem>
							</SelectContent>
						</Select>
						<FormDescription>
							Select Student if you are a student or select your
							job.
						</FormDescription>
					</FormItem>
				)}
			/>
		</>
	);
}
