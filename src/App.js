import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import AppRouter from "./routes";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}
