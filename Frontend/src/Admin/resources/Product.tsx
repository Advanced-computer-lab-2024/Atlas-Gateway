import axios from "axios";
import { Package, Pencil, RotateCw } from "lucide-react";
import React, { useEffect, useState } from "react";

// Importing the icon
import SheetDemo from "../components/SheetDemo";

interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	picture: string;
	quantity: number;
	isArchived: boolean;
	sales: number;
	rating: number;
	review: string;
}

const Product = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/products/list")
			.then((res) => {
				console.log(res.data);
				setProducts(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	return (
		<div className="flex flex-col p-3 h-screen overflow-y-auto pb-32">
			<div className="flex gap-3 self-end pb-3">
				<div className="cursor-pointer hover:text-[#2b58ed]">
					<RotateCw onClick={() => setRefresh(!refresh)} />
				</div>
				<SheetDemo />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((prod) => (
					<div
						key={prod._id}
						className="relative flex flex-col p-4 bg-white shadow-lg rounded-lg"
					>
						<div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-md">
							<Package className="w-16 h-16 text-gray-400" />
						</div>
						<h2 className="text-lg font-semibold mt-2">
							{prod.name}
						</h2>
						<h3 className="">{prod.description}</h3>
						<div className="flex justify-between mt-3">
							<div className="flex flex-col">
								<h3 className="text-sm">
									Price: ${prod.price}
								</h3>
								<h3 className="text-sm">
									Archived: {prod.isArchived ? "Yes" : "No"}
								</h3>
							</div>
							<div className="flex flex-col">
								<h3 className="text-sm">
									Quantity: {prod.quantity}
								</h3>
								<h3 className="text-sm">Sales: {prod.sales}</h3>
							</div>
						</div>
						<h3 className="text-sm text-[#2b58ed]">
							Rating: {prod.rating} / 5
						</h3>
						<h3 className="pb-6">{prod.review}</h3>
						<div className="flex justify-center">
							<button className="bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600">
								<Pencil className="w-5 h-5" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Product;
