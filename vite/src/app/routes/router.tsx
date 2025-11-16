import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '@app/layout/AppLayout.tsx';
import { NotFound } from './NotFound';
import { AuthForm, RegisterForm, UserDetails } from './legacy.tsx';
import { HomePage } from '@pages/Home/HomePage.tsx';
import { WalletPage } from "@pages/Wallet/WalletPage.tsx";
import { AuthReq } from '@components/IsLogin.tsx';
import {AccountPage} from "@pages/Account/AccountPage.tsx";

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
                    {path: "wallet/:id", element: <WalletPage />},
                    {path: "details/:name", element: <UserDetails />},
                    {path: "account/:accountId", element: <AccountPage />}
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