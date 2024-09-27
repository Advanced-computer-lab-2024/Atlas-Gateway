import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './index.css';
import Register from './Register/Register';

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
		<RouterProvider router={router} />
	</StrictMode>
);
