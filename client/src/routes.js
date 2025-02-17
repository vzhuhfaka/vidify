import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

export default function Router () {
    const Routes = useRoutes([
        {
            path: '/main',
            element: <MainPage />, 
        },
        {
            path: '/profile',
            element: <ProfilePage />,
        },
        {
            path: '*',
            element: <Navigate to="/main" />
        }
    ])

    return Routes
}