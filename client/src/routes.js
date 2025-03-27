import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { AddVideoPage } from "./pages/AddVideoPage"
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

export default function Router () {
    const Routes = useRoutes([
        {
            path: '/main',
            element: <MainPage />, 
        },
        {
            path: '/profile/add-video',
            element: <AddVideoPage />
        },
        {
            path: '/profile',
            element: <ProfilePage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/history',
            element: <MainPage />,
        },
        {
            path: '*',
            element: <Navigate to="/main" />
        }
    ])

    return Routes
}