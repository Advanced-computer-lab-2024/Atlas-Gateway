import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Activites from "./Activities/Activites";
import Admin from "./Admin/Dashboard";
import AdvertisorProfile from "./Advertisor/Profile";
import Home from "./Home/Home";
import Itineraries from "./Itineraries/Itineraries";
import Products from "./Products/Products";
import Register from "./Register/Register";
import PlacesForm from "./TourismGovernor/HistoricalPlacesForm";
import "./index.css";
import Layout from "./layout/Layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/admin",
		element: <Admin />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
				index: true,
			},
			{
				path: "/places",
				element: <PlacesForm />,
			},
			{
				path: "/products",
				element: <Products />,
			},
			{
				path: "/activities",
				element: <Activites />,
			},
			{
				path: "/itineraries",
				element: <Itineraries />,
			},
		],
	},
	{
		path: "/advertisor/profile",
		element: <AdvertisorProfile />,
	},
	{
		path: "/guide/profile",
		element: <TourGuideProfile />,
	},
	{
		path: "/seller/profile",
		element: <SellerProfile />,
	},
	{
		path: "/profile",
		element: <TouristProfile/>
	}

]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
