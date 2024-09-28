import { EAccountType } from '@/types/enums';

export type TRegisterForm = {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
	type: string;
	date_of_birth?: string;
	mobile_number?: string;
	occupation?: string;
	nationality?: string;
};

export const accountTypeArray = [
	EAccountType.Tourist,
	EAccountType.Guide,
	EAccountType.Seller,
	EAccountType.Advertiser,
];

export type TAddProductForm = {
	product_name: string; // Name of the product
	product_price: number; // Price of the product (could be string or number)
	available_quantity: number; // Available quantity of the product
	details?: string; // Optional field for additional product details
};