import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '@app/layout/AppLayout.tsx';
import { NotFound } from './NotFound';
import { AuthForm, RegisterForm, WalletDetails } from './legacy.tsx';
import { HomePage } from '@pages/Home/HomePage.tsx';
import { AuthReq } from '../../components/IsLogin.tsx';

const router = createBrowserRouter([
    {
        element: <AuthReq/>,
        children: [
            {
                path: '/',
                element: <AppLayout/>,
                errorElement: <NotFound/>,
                children: [
                    {index: true, element: <HomePage/>},
                    {path: "wallet/:id", element: <WalletDetails />}
                ],
            },
        ]
    },
    {
        path: '/auth/login',
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <AuthForm /> },
        ],
    },
    {
        path: '/auth/signup',
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <RegisterForm /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

export function AppRouter() {
    return (
        <RouterProvider router={router} />
    );
}