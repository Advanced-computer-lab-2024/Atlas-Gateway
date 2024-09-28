import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { TAddProductForm } from '../Products/types';

export default function AddProductForm() {
	const form = useFormContext<TAddProductForm>();

	return (
		<>
			{/* Name Input */}
			<FormField
				control={form.control}
				name="product_name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input placeholder="Product Name" {...field} />
						</FormControl>
						<FormDescription>
							Enter the name of the product.
						</FormDescription>
					</FormItem>
				)}
			/>

			{/* Price Input */}
			<FormField
				control={form.control}
				name="product_price"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Price</FormLabel>
						<FormControl>
							<Input placeholder="Product Price" {...field} />
						</FormControl>
						<FormDescription>
							Enter the price of the product.
						</FormDescription>
					</FormItem>
				)}
			/>

			{/* Available Quantity Input */}
			<FormField
				control={form.control}
				name="available_quantity"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Available Quantity</FormLabel>
						<FormControl>
							<Input placeholder="Available Quantity" {...field} />
						</FormControl>
						<FormDescription>
							Enter the available quantity.
						</FormDescription>
					</FormItem>
				)}
			/>

			{/* Details Input */}
			<FormField
				control={form.control}
				name="details"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Details</FormLabel>
						<FormControl>
							<Input placeholder="More info" {...field} />
						</FormControl>
						<FormDescription>
							Enter the product details.
						</FormDescription>
					</FormItem>
				)}
			/>
		</>
	);
}

