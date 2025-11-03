import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppLayout} from "@app/layout/AppLayout.tsx"
import {NotFound} from "./NotFound";
import {AuthForm, LegacyHome} from "./legacy.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <LegacyHome/>},
        ],
    },
    {
        path: "/auth/login",
        element: <AppLayout />,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <AuthForm/>}
            ]
    },
    {path: "*", element: <NotFound/>}
    ]);

export function AppRouter() {
    return <RouterProvider router={router}/>;
}