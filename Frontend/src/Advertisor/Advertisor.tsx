import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";

const Advertisor = () => {
	return (
		<div className="w-screen h-screen bg-[#ebedf1]">
			<Navbar />
			<div className="w-full h-full flex justify-center items-center">
				<h1 className="text-4xl font-bold text-primary">
					Advertisor Dashboard
				</h1>
			</div>
			<Routes>
				{/* Correct the path to match the URL you want */}
				<Route path="/advertisor/profile" element={<Profile />} />
			</Routes>
		</div>
	);
};

export default Advertisor;
