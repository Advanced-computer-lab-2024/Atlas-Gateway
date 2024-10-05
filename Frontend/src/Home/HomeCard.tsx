import { Link } from "react-router-dom";

import Label from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function HomeCard({
	title,
	description,
	href,
}: {
	title: string;
	description: string;
	href: string;
}) {
	return (
		<Link to={href}>
			<Card className="w-72 h-44 shadow-2xl opacity-80 hover:outline hover:outline-2 hover:opacity-90">
				<CardHeader>
					<Label.Mid600>{title}</Label.Mid600>
				</CardHeader>
				<CardContent>{description}</CardContent>
			</Card>
		</Link>
	);
}
