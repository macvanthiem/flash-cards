import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ROUTE from "../configs/route";
import ADMIN from "../configs/admin";

export default function AdminRoutes({ component: Component, ...rest }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);
    console.log(user);
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    user.email === ADMIN.EMAIL ? (
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
