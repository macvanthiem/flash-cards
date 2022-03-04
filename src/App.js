import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import AppRouter from "./routes";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";
// import Home from "./pages/Home";
// import FlashCard from "./components/FlashCard";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}
