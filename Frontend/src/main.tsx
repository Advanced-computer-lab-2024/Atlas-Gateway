import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";



import Activites from "./Activities/Activites";
import ActivityDetails from "./Activities/ActivityDetails";
import Admin from "./Admin/Dashboard";
import Home from "./Home/Home";
import Itineraries from "./Itineraries/Itineraries";
import ItineraryDetails from "./Itineraries/ItineraryDetails";
import PlaceDetails from "./Places/PlaceDetails";
import Places from "./Places/Places";
import PlacesForm from "./Places/PlacesForm";
import ProductDetails from "./Products/ProductDetails";
import Products from "./Products/Products";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import { QueryStateProvider } from "./api/data/useQueryString";
import "./index.css";
import Layout from "./layout/Layout";
import Login from "./Login/Login";


const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/admin",
		element: (
			<QueryStateProvider>
				<Admin />
			</QueryStateProvider>
		),
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: (
			<QueryStateProvider>
				<Layout />
			</QueryStateProvider>
		),
		children: [
			{
				path: "/",
				element: <Home />,
				index: true,
			},
			{
				path: "/profile",
				element: <Profile />,
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
						element: <ItineraryDetails />,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);