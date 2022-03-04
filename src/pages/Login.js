import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { blue } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";

export default function Login() {
    const [isLoginPage, setIsLoginpage] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const colorPriamry = blue[700];
    const history = useHistory();

    const switchPage = () => {
        setIsLoginpage(!isLoginPage);
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async () => {
        if (isLoginPage) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                history.push("/");
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                history.push("/");
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <Box sx={{ width: "350px", margin: "0 auto", marginTop: "100px" }}>
            <Typography textAlign={"center"} marginBottom={3} variant="h4" component="h1">
                {isLoginPage ? "Login" : "Register"}
            </Typography>
            <Box sx={{ width: "100%", display: "flex", alignItems: "flex-end", marginBottom: 2 }}>
                <MailOutlineIcon sx={{ color: "action.active", mr: 1.5, my: 0.5 }} />
                <TextField
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", marginBottom: 4 }}>
                <LockOutlinedIcon sx={{ color: "action.active", mr: 1.5, my: 0.5 }} />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Box>
            <Button variant="outlined" fullWidth onClick={handleSubmit}>
                Submit
            </Button>
            <Box marginTop={3} textAlign="center">
                {isLoginPage ? (
                    <>
                        <Typography variant="span">If you do not already have an account, </Typography>
                        <Typography variant="span" sx={{ color: colorPriamry, cursor: "pointer" }} onClick={switchPage}>
                            Register now!
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="span">Do you already have an account? </Typography>
                        <Typography variant="span" sx={{ color: colorPriamry, cursor: "pointer" }} onClick={switchPage}>
                            Login here!
                        </Typography>
                    </>
                )}
            </Box>
            {error ? (
                <Alert severity="error" sx={{ marginTop: 3 }}>
                    {error}
                </Alert>
            ) : (
                <></>
            )}
        </Box>
    );
}
