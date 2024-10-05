"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/togglegroup";

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const formSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        ticketF: z.number().positive("Price for foreigners is required"),
        ticketN: z.number().positive("Price for natives is required"),
        ticketS: z.number().positive("Price for students is required"),
        days: z.array(z.enum(['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'])).min(1, "At least one working day is required"),
        openSat: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        closeSat: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        openSun: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        closeSun: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        openMon: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        closeMon: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        openTue: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        closeTue: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        openWed: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        closeWed: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        openThu: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        closeThu: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        openFri: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
        closeFri: z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        }),
    }).refine(data => timeToMinutes(data.openSat) <= timeToMinutes(data.closeSat), {
        message: "Opening hour must be less than closing hour",
        path: ["openSat"],
    }).refine(data => timeToMinutes(data.openSun) <= timeToMinutes(data.closeSun), {
        message: "Opening hour must be less than closing hour",
        path: ["openSun"],
    }).refine(data => timeToMinutes(data.openMon) <= timeToMinutes(data.closeMon), {
        message: "Opening hour must be less than closing hour",
        path: ["openMon"],
    }).refine(data => timeToMinutes(data.openTue) <= timeToMinutes(data.closeTue), {
        message: "Opening hour must be less than closing hour",
        path: ["openTue"],
    }).refine(data => timeToMinutes(data.openWed) <= timeToMinutes(data.closeWed), {
        message: "Opening hour must be less than closing hour",
        path: ["openWed"],
    }).refine(data => timeToMinutes(data.openThu) <= timeToMinutes(data.closeThu), {
        message: "Opening hour must be less than closing hour",
        path: ["openThu"],
    }).refine(data => timeToMinutes(data.openFri) <= timeToMinutes(data.closeFri), {
        message: "Opening hour must be less than closing hour",
        path: ["openFri"],
    });

const PlacesForm: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            ticketF: 0,
            ticketN: 0,
            ticketS: 0,
            days: [],
        },
    });

    const { watch } = form;
    const days = watch("days");

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        form.reset();
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex gap-8"
                    >
                        <div id="info" className="flex-1">
                            <h2 className="text-lg font-medium mb-4">Information</h2>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the place's name" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter the place's description" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <h3 className="text-lg font-medium mt-4">Ticket Prices</h3>

                            <FormField
                                control={form.control}
                                name="ticketF"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Foreigners</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the price for foreigners" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ticketN"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Natives</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the price for natives" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ticketS"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Students</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the price for students" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div id="hours" className="flex-1">
                            <h2 className="text-lg font-medium mt-4">Opening Hours</h2>

                            <FormField
                                control={form.control}
                                name="days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Working Days</FormLabel>
                                        <FormControl>
                                            <ToggleGroup variant="outline" type="multiple" value={field.value} onValueChange={field.onChange} className="mb-4">
                                                <ToggleGroupItem value="sat">Sa</ToggleGroupItem>
                                                <ToggleGroupItem value="sun">Su</ToggleGroupItem>
                                                <ToggleGroupItem value="mon">Mo</ToggleGroupItem>
                                                <ToggleGroupItem value="tue">Tu</ToggleGroupItem>
                                                <ToggleGroupItem value="wed">We</ToggleGroupItem>
                                                <ToggleGroupItem value="thu">Th</ToggleGroupItem>
                                                <ToggleGroupItem value="fri">Fr</ToggleGroupItem>
                                            </ToggleGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {days.includes("sat") && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <label className="whitespace-nowrap">Saturday</label>
                                    <FormField
                                        control={form.control}
                                        name="openSat"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="closeSat"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {days.includes("sun") && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <label className="whitespace-nowrap">Sunday</label>
                                    <FormField
                                        control={form.control}
                                        name="openSun"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="closeSun"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {days.includes("mon") && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <label className="whitespace-nowrap">Monday</label>
                                    <FormField
                                        control={form.control}
                                        name="openMon"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="closeMon"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {days.includes("tue") && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <label className="whitespace-nowrap">Tuesday</label>
                                    <FormField
                                        control={form.control}
                                        name="openTue"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="closeTue"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {days.includes("wed") && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <label className="whitespace-nowrap">Wednesday</label>
                                    <FormField
                                        control={form.control}
                                        name="openWed"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="closeWed"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {days.includes("thu") && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <label className="whitespace-nowrap">Thursday</label>
                                    <FormField
                                        control={form.control}
                                        name="openThu"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="closeThu"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {days.includes("fri") && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <label className="whitespace-nowrap">Friday</label>
                                    <FormField
                                        control={form.control}
                                        name="openFri"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="closeFri"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input type="time" {...field} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <div className="mt-6 flex justify-center">
                                <Button type="submit" className="w-1/3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
}

export default PlacesForm;
