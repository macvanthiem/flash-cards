// import React from "react";
import routes from "../configs/route";

// const Login = React.lazy(() => import("../pages/Login"));
// const Home = React.lazy(() => import("../pages/Home"));
// const Forbidden = React.lazy(() => import("../pages/Forbidden"));
// const Dashboard = React.lazy(() => import("../pages/Dashboard"));
import Login from "../pages/Login";
import Home from "../pages/Home";
import Forbidden from "../pages/Forbidden";
import Dashboard from "../pages/Dashboard";

export const appRoutes = [
    {
        path: routes.LOGIN,
        component: Login,
        isAdmin: false,
    },
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
