import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Route, Redirect } from "react-router-dom";
import ROUTE from "../configs/route";

export default function UserRoutes({ component: Component, ...rest }) {
    const user = useContext(AuthContext);
    console.log(user);
    return (
        <Route {...rest} render={(props) => (user ? <Component {...props} /> : <Redirect exact to={ROUTE.LOGIN} />)} />
    );
}
