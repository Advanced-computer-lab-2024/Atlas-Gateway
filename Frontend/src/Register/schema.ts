import { EAccountType } from '@/types/enums';
import { addYears } from 'date-fns';
import { z } from 'zod';

export const accountTypeSchema = z.object({
	type: z.enum(
		[
			EAccountType.Tourist,
			EAccountType.Guide,
			EAccountType.Seller,
			EAccountType.Advertiser,
		],
		{
			message: 'Please select an account type to continue',
		}
	),
});

export const touristInfoSchema = z
	.object({
		mobile_number: z
			.string({
				message: 'Please enter a valid mobile number',
			})
			.min(10, {
				message: 'Mobile number must be at least 10 characters long',
			}),
		nationality: z
			.string({ message: 'Please select your nationality' })
			.min(1, { message: 'Please select your nationality' }),
		date_of_birth: z.date({
			message: 'Please enter a valid date of birth',
		}),
		occupation: z
			.string({
				message: 'Please select your occupation',
			})
			.min(1, { message: 'Please select your occupation' }),
	})
	.superRefine(({ date_of_birth }, ctx) => {
		if (date_of_birth > addYears(new Date(), -18)) {
			ctx.addIssue({
				code: 'custom',
				message: 'You must be at least 18 years old to register',
				path: ['date_of_birth'],
			});
		}
	});

export const accountInfoSchema = z
	.object({
		username: z
			.string({
				message: 'Please enter a valid username',
			})
			.min(3, { message: 'Please enter a username longer than 3 characters' }),
		email: z
			.string({
				message: 'Please enter a valid email address',
			})
			.email({ message: 'Invalid email address' }),
		password: z
			.string({
				message: 'Please enter a valid password',
			})
			.min(8, { message: 'Password must be at least 8 characters long' }),
		confirmPassword: z
			.string({
				message: 'Please confirm your password',
			})
			.min(8, { message: 'Password must be at least 8 characters long' }),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and confirm password do not match',
				path: ['confirmPassword'],
			});
		}
	});

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
