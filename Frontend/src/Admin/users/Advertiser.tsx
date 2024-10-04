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

import SheetDemo from "../components/SheetDemo";

interface CompanyProfile {
	hotline: number;
	address: string;
	website: string;
	logo: string;
	description: string;
}

interface Advertiser {
	_id: string;
	userName: string;
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
			<SheetDemo />
			<Table className="shadow-lg">
				<TableCaption>Registered Advertisers.</TableCaption>
				<TableHeader className="bg-gray-100">
					<TableRow>
						<TableHead>UserName</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Hotline</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>Website</TableHead>
						<TableHead></TableHead>
						<TableHead className="cursor-pointer hover:text-[#2b58ed]">
							<RotateCw onClick={() => setRefresh(!refresh)} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{advertisers.map((advertiser) => (
						<TableRow key={advertiser._id}>
							<TableCell className="p-3">
								{advertiser.userName}
							</TableCell>
							<TableCell>{advertiser.email}</TableCell>
							<TableCell>{advertiser.password}</TableCell>
							<TableCell>
								{advertiser.companyProfile.hotline}
							</TableCell>
							<TableCell>
								{advertiser.companyProfile.address}
							</TableCell>
							<TableCell>
								<a
									href={advertiser.companyProfile.website}
									target="_blank"
								>
									{advertiser.companyProfile.website}
								</a>
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed]">
								<Pencil />
							</TableCell>
							<TableCell className="cursor-pointer hover:text-[#2b58ed]">
								<Trash
									onClick={() => handleDelete(advertiser._id)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Advertisers;
