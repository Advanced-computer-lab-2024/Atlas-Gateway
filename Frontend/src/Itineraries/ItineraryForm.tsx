"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from 'react-hook-form';
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const accessibility = [
    {
        id: "pets",
        label: "Pets",
    },
    {
        id: "children",
        label: "Children",
    },
    {
        id: "elevator",
        label: "Elevator",
    },
    {
        id: "wheelchair",
        label: "Wheelchair",
    },
    {
        id: "tourGuide",
        label: "Tour Guide",
    },
] as const

const formSchema = z
    .object({
        activities: z.array(z.string().min(1, 'Activity is required')),
        locations: z.array(z.string().min(1, 'Location is required')),
        timeline: z.array(z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format",
        })),
        durations: z.array(z.number().positive().max(24).min(1)),
        language: z.string().min(1, 'Language of Itinerary is required'),
        price: z.number().positive(),
        availableDates: z.array(z.string().refine(value => /^\d{2}-\d{2}-\d{4}$/.test(value), {
            message: "Invalid date format. Use DD-MM-YYYY.",
        })),
        availableTimes: z.array(z.string().refine(value => /^\d{2}:\d{2}$/.test(value), {
            message: "Invalid time format. Use HH:MM.",
        })),
        accessibility: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),
        pickUp: z.string().min(1, 'PickUp location is required'),
        dropOff: z.string().min(1, 'DropOff location is required'),
    })
    .refine((data) => data.activities.length === data.durations.length, {
        message: "The number of activities must match the number of durations.",
        path: ["durations"],
    })
    .refine((data) => data.pickUp !== data.dropOff, {
        message: "PickUp and DropOff locations cannot be the same",
        path: ["dropOff"],
    });

const ItineraryForm: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activities: [],
            locations: [],
            timeline: [],
            durations: [],
            language: "",
            price: 0,
            availableDates: [],
            availableTimes: [],
            accessibility: [""],
            pickUp: "",
            dropOff: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        form.reset();
    };

    return (
        <div className="grid place-items-center items-center w-full h-full bg-gray-100 p-4">
            <Card className="w-full max-w-2xl h-auto rounded-lg shadow-lg p-6 bg-white">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
                        <h2 className="text-2xl align-center font-semibold mb-4 text-gray-700">Itinerary Details</h2>

                        <div id="details" className="flex-1 space-y-4">
                            <h3 className="text-lg font-medium mb-2 text-gray-600">Activities</h3>
                            <Controller
                                name="activities"
                                control={form.control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        {value.map((activity, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={activity}
                                                    onChange={(e) => {
                                                        const newActivity = [...value];
                                                        newActivity[index] = e.target.value;
                                                        onChange(newActivity);
                                                    }}
                                                    placeholder={`Activity ${index + 1}`}
                                                    className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newActivity = value.filter((_, i) => i !== index);
                                                        onChange(newActivity);
                                                    }}
                                                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange([...value, ""]);
                                            }}
                                            className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                        >
                                            Add Activity
                                        </button>
                                    </>
                                )}
                            />

                            <h3 className="text-lg font-medium mb-2 text-gray-600">Locations</h3>
                            <Controller
                                name="locations"
                                control={form.control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        {value.map((location, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={location}
                                                    onChange={(e) => {
                                                        const newLocations = [...value];
                                                        newLocations[index] = e.target.value;
                                                        onChange(newLocations);
                                                    }}
                                                    placeholder={`Location ${index + 1}`}
                                                    className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newLocations = value.filter((_, i) => i !== index);
                                                        onChange(newLocations);
                                                    }}
                                                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange([...value, ""]); // Add a new empty location
                                            }}
                                            className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                        >
                                            Add Location
                                        </button>
                                    </>
                                )}
                            />

                            <h3 className="text-lg font-medium mb-2 text-gray-600">Durations</h3>
                            <Controller
                                name="durations"
                                control={form.control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        {value.map((duration, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="number"
                                                    value={duration}
                                                    onChange={(e) => {
                                                        const newDurations = [...value];
                                                        newDurations[index] = Number(e.target.value); // Convert to number
                                                        onChange(newDurations);
                                                    }}
                                                    placeholder={`Duration ${index + 1}`}
                                                    className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newDurations = value.filter((_, i) => i !== index);
                                                        onChange(newDurations);
                                                    }}
                                                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange([...value, 1]); // Start with a default duration of 1
                                            }}
                                            className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                        >
                                            Add Duration
                                        </button>
                                    </>
                                )}
                            />

                            <h3 className="text-lg font-medium mb-2 text-gray-600">Timeline</h3>
                            <Controller
                                name="timeline"
                                control={form.control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        {value.map((timeline, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="time"
                                                    value={timeline}
                                                    onChange={(e) => {
                                                        const newTime = [...value];
                                                        newTime[index] = e.target.value;
                                                        onChange(newTime);
                                                    }}
                                                    placeholder={`Time ${index + 1}`}
                                                    className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newTime = value.filter((_, i) => i !== index);
                                                        onChange(newTime);
                                                    }}
                                                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange([...value, ""]);
                                            }}
                                            className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                        >
                                            Add Time
                                        </button>
                                    </>
                                )}
                            />

                            <h3 className="text-lg font-medium mb-2 text-gray-600">Available Times</h3>
                            <Controller
                                name="availableTimes"
                                control={form.control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        {value.map((availableTime, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="time"
                                                    value={availableTime}
                                                    onChange={(e) => {
                                                        const newAvailableTime = [...value];
                                                        newAvailableTime[index] = e.target.value;
                                                        onChange(newAvailableTime);
                                                    }}
                                                    placeholder={`Available Time ${index + 1}`}
                                                    className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newAvailableTime = value.filter((_, i) => i !== index);
                                                        onChange(newAvailableTime);
                                                    }}
                                                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange([...value, ""]);
                                            }}
                                            className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                        >
                                            Add Available Time
                                        </button>
                                    </>
                                )}
                            />

                            <h3 className="text-lg font-medium mb-2 text-gray-600">Available Dates</h3>
                            <Controller
                                name="availableDates"
                                control={form.control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        {value.map((availableDate, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="date"
                                                    value={availableDate}
                                                    onChange={(e) => {
                                                        const newAvailableDate = [...value];
                                                        newAvailableDate[index] = e.target.value;
                                                        onChange(newAvailableDate);
                                                    }}
                                                    className="border border-gray-300 rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 flex-1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newAvailableDate = value.filter((_, i) => i !== index);
                                                        onChange(newAvailableDate);
                                                    }}
                                                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange([...value, ""]);
                                            }}
                                            className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                                        >
                                            Add Available Date
                                        </button>
                                    </>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accessibility"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">Accessibility</FormLabel>
                                        </div>
                                        {accessibility.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="accessibility"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex flex-row items-start space-x-3">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
                                                                            : field.onChange(field.value?.filter((value) => value !== item.id));
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">{item.label}</FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="language"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Language</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the language"
                                                {...field}
                                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the price"
                                                {...field}
                                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="pickUp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pick Up</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the Pick Up location"
                                                {...field}
                                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dropOff"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Drop Off Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the Drop Off location"
                                                {...field}
                                                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Button
                                type="submit"
                                className="w-full max-w-xs bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default ItineraryForm;