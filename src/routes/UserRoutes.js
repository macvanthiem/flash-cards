import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Route, Redirect } from "react-router-dom";
import ROUTE from "../configs/route";

export default function UserRoutes({ component: Component, ...rest }) {
    const user = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                !(Object.keys(user).length === 0) ? <Component {...props} /> : <Redirect exact to={ROUTE.LOGIN} />
            }
        />
    );
}
