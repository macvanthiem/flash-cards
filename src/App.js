import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </AuthProvider>
        </BrowserRouter>
    );
}
