import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Admin from "./Admin/Dashboard";
import Advertisor from "./Advertisor/Advertisor";
import AdvertisorProfile from "./Advertisor/Profile";
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
				path: "/advertisor",
				element: <Advertisor />,
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
