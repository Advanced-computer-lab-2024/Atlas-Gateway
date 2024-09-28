import { z } from 'zod';
export const addProductFormSchema = z.object({
	product_name: z
		.string()
		.min(1, { message: 'Product name is required' })
		.min(5, { message: 'Product name must be at least 5 characters long' }),
	product_price: z
		.number({
			invalid_type_error: 'Price must be a number',
		})
		.min(1, { message: 'Price must be at least 1' }),
	available_quantity: z
		.number({
			invalid_type_error: 'Available quantity must be a number',
		})
		.nonnegative({ message: 'Available quantity must be a positive number' }),
	details: z
		.string()
		.min(1, { message: 'Details are required' })
		.min(10, { message: 'Details must be at least 10 characters long' }),
});