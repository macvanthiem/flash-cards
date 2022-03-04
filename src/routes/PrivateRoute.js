import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Route, Redirect } from "react-router-dom";
import ROUTE from "../configs/route";

export default function PrivateRoute({ component: Component, ...rest }) {
    const user = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) => (user?.isAdmin ? <Component {...props} /> : <Redirect exact to={ROUTE.FORBIDDEN} />)}
        />
    );
}
