import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	Navigate,
	Outlet,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import Activites from "./Activities/Activites";
import ActivityDetails from "./Activities/ActivityDetails";
import Admins from "./Admin/Accounts/Admin";
import Advertisers from "./Admin/Accounts/Advertiser";
import Governor from "./Admin/Accounts/Governor";
import Seller from "./Admin/Accounts/Seller";
import TourGuide from "./Admin/Accounts/TourGuide";
import Tourists from "./Admin/Accounts/Tourist";
import Category from "./Admin/Activity/Category";
import Tags from "./Admin/Activity/Tags";
import AdminLayout from "./Admin/AdminLayout";
import ComplaintDetails from "./Admin/Complaint/ComplaintDetails";
import Complaints from "./Admin/Complaint/Complaints";
import AdminProducts from "./Admin/Product/Product";
import Flights from "./Fights/Flights";
import Home from "./Home/Home";
import Hotels from "./Hotels/Hotels";
import Itineraries from "./Itineraries/Itineraries";
import ItineraryDetails from "./Itineraries/ItineraryDetails";
import Login from "./Login/Login";
import PlaceDetails from "./Places/PlaceDetails";
import Places from "./Places/Places";
import ProductDetails from "./Products/ProductDetails";
import Products from "./Products/Products";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import AdminReport from "./Reports/Admin/AdminReport";
import TransportationDetails from "./Transportations/TransportationDetails";
import Transportations from "./Transportations/Transportations";
import { QueryStateProvider } from "./api/data/useQueryString";
import "./index.css";
import Layout from "./layout/Layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		children: [
			{
				path: "/admin",
				element: (
					<QueryStateProvider>
						<AdminLayout>
							<Outlet />
						</AdminLayout>
					</QueryStateProvider>
				),
				children: [
					{
						index: true,
						path: "/admin",
						element: <Navigate to="/admin/accounts" />,
					},
					{
						path: "/admin/accounts",
						element: <Outlet />,
						children: [
							{
								index: true,
								path: "/admin/accounts",
								element: (
									<Navigate to="/admin/accounts/tourists" />
								),
							},
							{
								path: "/admin/accounts/tourists",
								element: <Tourists />,
							},
							{
								path: "/admin/accounts/admins",
								element: <Admins />,
							},
							{
								path: "/admin/accounts/tour-guides",
								element: <TourGuide />,
							},
							{
								path: "/admin/accounts/advertisers",
								element: <Advertisers />,
							},
							{
								path: "/admin/accounts/governors",
								element: <Governor />,
							},
							{
								path: "/admin/accounts/sellers",
								element: <Seller />,
							},
						],
					},
					{
						path: "/admin/products",
						element: <AdminProducts />,
					},
					{
						path: "/admin/activity-category",
						element: <Category />,
					},
					{
						path: "/admin/tags",
						element: <Tags />,
					},
					{
						path: "/admin/complaints",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <Complaints />,
							},
							{
								path: "/admin/complaints/:id",
								element: <ComplaintDetails />,
							},
						],
					},
					{
						path: "/admin/report",
						element: <AdminReport />,
					},
				],
			},
		],
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
			{
				path: "/flights",
				element: <Outlet />,
				children: [
					{
						path: "/flights",
						element: <Flights />,
					},
				],
			},
			{
				path: "/hotels",
				element: <Hotels />,
			},
			{
				path: "/transportations",
				element: <Outlet />,
				children: [
					{
						path: "/transportations",
						index: true,
						element: <Transportations />,
					},
					{
						path: "/transportations/:id",
						element: <TransportationDetails />,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>,
	// </StrictMode>,
);
