
export type TAddProductForm = {
	product_name: string; // Name of the product
	product_price: number; // Price of the product (could be string or number)
	available_quantity: number; // Available quantity of the product
	details?: string; // Optional field for additional product details
};

