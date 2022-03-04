import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../configs/firebase";
import ADMIN from "../configs/admin";
import Loading from "../components/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const unsubcribed = onAuthStateChanged(auth, (_user) => {
            if (_user) {
                const { email } = _user;
                ADMIN.EMAIL === email
                    ? setUser({ email: email, isAdmin: true })
                    : setUser({ email: email, isAdmin: false });

                setIsLoading(false);
                history.push("/");
                return;
            }
            setUser({});
            setIsLoading(false);
            history.push("/login");
        });
        return unsubcribed;
    }, [history]);

    return <AuthContext.Provider value={user}>{isLoading ? <Loading /> : children}</AuthContext.Provider>;
};

export default AuthProvider;
