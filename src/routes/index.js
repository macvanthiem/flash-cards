// import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { appRoutes } from "./appRoutes";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout";
// import Loading from "../components/Loading";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
    const publicRoutes = appRoutes.filter((privateRoute) => !privateRoute.isAdmin);
    const privateRoutes = appRoutes.filter((privateRoute) => privateRoute.isAdmin);

    return (
        // <Suspense fallback={<Loading />}>
        <Layout>
            <Switch>
                {publicRoutes.map((publicRoute) => (
                    <Route key={publicRoute.path} exact component={publicRoute.component} path={publicRoute.path} />
                ))}
                {privateRoutes.map((privateRoute) => (
                    <PrivateRoute
                        key={privateRoute.path}
                        exact
                        component={privateRoute.component}
                        path={privateRoute.path}
                    />
                ))}
                <Route exact component={NotFound} path="*" />
            </Switch>
        </Layout>
        // </Suspense>
    );
}
