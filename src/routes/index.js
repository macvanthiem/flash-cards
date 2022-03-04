import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { appRoutes } from "./appRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

export default function AppRouter() {
    const publicRoutes = appRoutes.filter((privateRoute) => !privateRoute.isAdmin);
    const privateRoutes = appRoutes.filter((privateRoute) => privateRoute.isAdmin);

    return (
        <Suspense fallback={<Loading />}>
            <Layout>
                <Switch>
                    {publicRoutes.map((publicRoute) => (
                        <UserRoutes
                            key={publicRoute.path}
                            exact
                            component={publicRoute.component}
                            path={publicRoute.path}
                        />
                    ))}
                    {privateRoutes.map((privateRoute) => (
                        <AdminRoutes
                            key={privateRoute.path}
                            exact
                            component={privateRoute.component}
                            path={privateRoute.path}
                        />
                    ))}
                    <Route exact component={Login} path="/login" />
                    <Route exact component={NotFound} path="/*" />
                </Switch>
            </Layout>
        </Suspense>
    );
}
