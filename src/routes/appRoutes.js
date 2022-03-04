import React from "react";
import routes from "../configs/route";

const Home = React.lazy(() => import("../pages/Home"));
const Forbidden = React.lazy(() => import("../pages/Forbidden"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

export const appRoutes = [
    {
        path: routes.HOME,
        component: Home,
        isAdmin: false,
    },
    {
        path: routes.FORBIDDEN,
        component: Forbidden,
        isAdmin: false,
    },
    {
        path: routes.DASHBOARD,
        component: Dashboard,
        isAdmin: true,
    },
];
