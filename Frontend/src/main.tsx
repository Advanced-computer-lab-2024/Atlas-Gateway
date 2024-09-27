import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Register from './Register/Register';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/',
		element: <Outlet />,
		children: [],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
