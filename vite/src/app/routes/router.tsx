import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '@app/layout/AppLayout.tsx';
import { NotFound } from './NotFound';
import { HomePage } from '@pages/Home/HomePage.tsx';
import { WalletPage } from "@pages/Wallet/WalletPage.tsx";
import { AuthorizationRequest } from '@components/authorization/AuthorizationRequest.tsx';
import {AccountPage} from "@pages/Account/AccountPage.tsx";
import {AuthorizationLoginPage} from "@pages/Authorization/AuthorizationLoginPage.tsx";
import {AuthorizationSingupPage} from "@pages/Authorization/AuthorizationSingupPage.tsx";
import {UserPage} from "@pages/User/UserPage.tsx";

const router = createBrowserRouter([
    {
        element: <AuthorizationRequest/>,
        children: [
            {
                path: '/',
                element: <AppLayout/>,
                errorElement: <NotFound/>,
                children: [
                    {index: true, element: <HomePage/>},
                    {path: "wallet/:id", element: <WalletPage />},
                    {path: "details/:name", element: <UserPage />},
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
            { index: true, element: <AuthorizationLoginPage /> },
        ],
    },
    {
        path: '/auth/signup',
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <AuthorizationSingupPage /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

export function AppRouter() {
    return (
        <RouterProvider router={router} />
    );
}