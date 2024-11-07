import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
	const navigate = useNavigate();
	return (
		<ArrowLeft
			className="cursor-pointer"
			onClick={() => navigate(-1)}
			size={32}
		/>
	);
}
