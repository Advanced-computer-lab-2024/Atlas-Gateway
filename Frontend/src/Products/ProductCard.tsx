import axios from "axios";
import {
	Archive,
	ArchiveRestore,
	DollarSign,
	Edit,
	EllipsisVertical,
	Eye,
	Package,
	ShoppingCart,
	Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	useAddProductToCart,
	useAddWishlist,
	useProducts,
	useRemoveWishlist,
	useUpdateProduct,
} from "@/api/data/useProducts";
import { useSellerProfile, useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import Rating, { ERatingType } from "@/components/ui/rating";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TProduct } from "@/types/global";

export default function ProductCard({
	product,
	openEditDrawer,
}: {
	product: TProduct;
	openEditDrawer: (product: TProduct) => void;
}) {
	const { user } = useLoginStore();
	const navigate = useNavigate();
	const { refetch } = useProducts();
	const { refetch: refetchTourist } = useTouristProfile();
	const { doAddProductToCart } = useAddProductToCart(refetchTourist);
	const [productPic, setProductPic] = useState("");
	const { doUpdateProduct } = useUpdateProduct(() => {
		refetch();
	});

	const { doAddWishlist } = useAddWishlist(() => {
		refetch();
	});
	const { doRemoveWishlist } = useRemoveWishlist(() => {
		refetch();
	});

	const handleArchive = (isArchived: boolean, id: string) => {
		doUpdateProduct({ isArchived: !isArchived, _id: id });
	};
	//TODO: Join product with seller instead of this garbage
	const { data: seller } = useSellerProfile(product.sellerId);
	const {
		_id,
		name,
		description,
		imagePath,
		price,
		avgRating,
		sellerId,
		sales,
		isArchived,
		touristWishlist,
	} = product;

	const convertCurrency = useCurrency();

	const handleDownload = async (filePath: string) => {
		try {
			axios
				.post(`http://localhost:5000/api/media/download`, { filePath })
				.then((res) => {
					setProductPic(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		handleDownload(imagePath);
	}, [imagePath]);

	const isAdminOrCreator =
		(user?.type === EAccountType.Seller && sellerId == user._id) ||
		user?.type === EAccountType.Admin;

	return (
		<Card
			key={_id}
			className="w-full h-[400px] flex gap-2 flex-col border-black border-2"
		>
			<Flex
				align="center"
				justify="center"
				className="bg-gray-200 rounded-t-xl w-full h-[200px]"
			>
				{!productPic ? (
					<Package className="w-20 h-20" />
				) : (
					<img
						src={productPic}
						alt="Product Picture"
						className="object-contain w-full h-full"
					/>
				)}
			</Flex>
			<CardContent>
				<Flex isColumn gap="2">
					<Flex align="center" justify="between">
						{user?.type === EAccountType.Tourist &&
							(touristWishlist?.includes(user?._id) ? (
								<Star
									fill="yellow"
									className="cursor-pointer"
									onClick={() => {
										if (product?._id) {
											doRemoveWishlist(product?._id);
										}
									}}
								/>
							) : (
								<Star
									className="cursor-pointer"
									onClick={() => {
										if (product?._id) {
											doAddWishlist(product?._id);
										}
									}}
								/>
							))}
						<Label.Mid500>{name}</Label.Mid500>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger className="bg-transparent">
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{isAdminOrCreator && (
									<>
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer"
											onClick={() =>
												handleArchive(isArchived, _id)
											}
										>
											{isArchived ? (
												<>
													<Archive /> Unarchive
												</>
											) : (
												<>
													<ArchiveRestore /> Archive
												</>
											)}
										</DropdownMenuItem>
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer"
											onClick={() =>
												openEditDrawer(product)
											}
										>
											<Edit />
											Edit
										</DropdownMenuItem>
									</>
								)}
								{user?.type === EAccountType.Tourist && (
									<DropdownMenuItem
										className="flex gap-2 cursor-pointer"
										onClick={() => {
											doAddProductToCart(_id);
										}}
									>
										<ShoppingCart />
										Add to Cart
									</DropdownMenuItem>
								)}
								<DropdownMenuItem
									className="flex gap-2 cursor-pointer"
									onClick={() => {
										navigate(`/products/${_id}`);
									}}
								>
									<Eye />
									View Details
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Flex>

					<Flex align="center" justify="between">
						<Flex gap="1" align="center">
							<DollarSign size={20} />
							<Label.Mid300 className="overflow-ellipsis">
								{convertCurrency(price)}
							</Label.Mid300>
						</Flex>
						<Flex gap="1" align="center">
							<Rating
								value={avgRating}
								ratingType={ERatingType.CARDS}
								interactive={false}
							/>
						</Flex>
					</Flex>
					<Label.Mid300 className="break-words h-[4.5rem] w-full overflow-y-scroll">
						{description}
					</Label.Mid300>
				</Flex>
			</CardContent>
			<CardFooter>
				<Flex justify="between" align="center" className="w-full">
					{seller && (
						<Flex gap="1" align="center">
							<Label.Thin300>Seller:</Label.Thin300>
							<Label.Mid300 className="overflow-ellipsis">
								{seller?.username}
							</Label.Mid300>
						</Flex>
					)}
					{isAdminOrCreator && (
						<Flex gap="1" align="center">
							<Label.Thin300 className="overflow-ellipsis">
								Sales
							</Label.Thin300>
							<Label.Mid300 className="overflow-ellipsis">
								{sales}
							</Label.Mid300>
						</Flex>
					)}
				</Flex>
			</CardFooter>
		</Card>
	);
}
