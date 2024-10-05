import axios from "axios";
import { Link, Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface CompanyProfile {
	hotline: number;
	address: string;
	website: string;
	logo: string;
	description: string;
}

interface Advertiser {
	_id: string;
	username: string;
	email: string;
	password: string;
	companyProfile: CompanyProfile;
	activities: string[];
}

const Advertisers = () => {
	const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/advertiser/list")
			.then((res) => {
				console.log(res.data);
				setAdvertisers(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:8000/api/advertiser/delete/${id}`)
			.then((res) => {
				setRefresh(!refresh);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col p-3">
			<Table className="shadow-lg">
				<TableCaption>Registered Advertisers.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Hotline</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>Website</TableHead>
						<TableHead>Logo</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed]">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{advertisers.map((advertiser) => (
						<TableRow key={advertiser._id}>
							<TableCell className="p-3">
								{advertiser.username}
							</TableCell>
							<TableCell>{advertiser.email}</TableCell>
							<TableCell>{advertiser.password}</TableCell>
							<TableCell>
								{advertiser.companyProfile?.hotline || "N/A"}
							</TableCell>
							<TableCell>
								{advertiser.companyProfile?.address || "N/A"}
							</TableCell>
							<TableCell>
								<a
									href={
										advertiser.companyProfile?.website ||
										"N/A"
									}
									target="_blank"
								>
									{advertiser.companyProfile?.website ||
										"N/A"}
								</a>
							</TableCell>
							<TableCell>
								{advertiser.companyProfile?.logo || "N/A"}
							</TableCell>
							<TableCell>
								{advertiser.companyProfile?.description ||
									"N/A"}
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed] w-1">
								<button className="bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600">
									<Trash
										className="w-4 h-4"
										onClick={() => {
											handleDelete(advertiser._id);
										}}
									/>
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Advertisers;