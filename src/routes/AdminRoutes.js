import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import ROUTE from "../configs/route";

export default function AdminRoutes({ component: Component, ...rest }) {
    const user = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                !(Object.keys(user).length === 0) ? (
                    user.isAdmin ? (
                        <Component {...props} />
                    ) : (
                        <Redirect exact to={ROUTE.FORBIDDEN} />
                    )
                ) : (
                    <Redirect exact to={ROUTE.LOGIN} />
                )
            }
        />
    );
}
