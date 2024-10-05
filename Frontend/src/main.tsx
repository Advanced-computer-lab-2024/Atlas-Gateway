import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Activites from "./Activities/Activites";
import ActivityDetails from "./Activities/ActivityDetails";
import Admin from "./Admin/Dashboard";
import AdvertisorProfile from "./Advertisor/Profile";
import Home from "./Home/Home";
import Itineraries from "./Itineraries/Itineraries";
import PlaceDetails from "./Places/PlaceDetails";
import Places from "./Places/Places";
import PlacesForm from "./Places/PlacesForm";
import AddProductForm from "./Products/AddProductForm";
import ProductDetails from "./Products/ProductDetails";
import Products from "./Products/Products";
import Register from "./Register/Register";
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
				element: <Outlet />,
				children: [
					{
						path: "/places",
						index: true,
						element: <Places />,
					},
					{
						path: "/places/:id",
						element: <PlaceDetails />,
					},
					{
						path: "/places/add",
						element: <PlacesForm />,
					},
				],
			},
			{
				path: "/products",
				element: <Outlet />,
				children: [
					{
						path: "/products",
						index: true,
						element: <Products />,
					},
					{
						path: "/products/:id",
						element: <ProductDetails />,
					},
					{
						path: "/products/add",
						element: <AddProductForm />,
					},
				],
			},
			{
				path: "/activities",
				element: <Outlet />,
				children: [
					{
						path: "/activities",
						index: true,
						element: <Activites />,
					},
					{
						path: "/activities/:id",
						element: <ActivityDetails />,
					},
					{
						path: "/activities/add",
						element: <AddProductForm />,
					},
				],
			},
			{
				path: "/itineraries",
				element: <Outlet />,
				children: [
					{
						path: "/itineraries",
						index: true,
						element: <Itineraries />,
					},
					{
						path: "/itineraries/:id",
						element: <ActivityDetails />,
					},
					{
						path: "/itineraries/add",
						element: <AddProductForm />,
					},
				],
			},
		],
	},
	{
		path: "/advertisor/profile",
		element: <AdvertisorProfile />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
