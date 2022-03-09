import { useState } from "react";
import { login, register } from "../firebase/auth";
import { blue } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import APP from "../configs/app";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// var CryptoJS = require("crypto-js");

export default function Login() {
    const [isLoginPage, setIsLoginpage] = useState(true);
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errorConfirmPass, setErrorConfirmPass] = useState("");
    const colorPriamry = blue[700];
    const history = useHistory();

    const switchPage = () => {
        setIsLoginpage(!isLoginPage);
        setEmail("");
        setPassword("");
    };

    const checkEmail = () => {
        if (email === "") {
            setErrorEmail("Email is required!");
            return false;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setErrorEmail("Email is wrong format!");
            return false;
        }
        setErrorEmail("");
        return true;
    };

    const checkPassword = () => {
        if (password === "") {
            setErrorPass("Password is required!");
            return false;
        }
        if (password.length < 8 && !isLoginPage) {
            setErrorPass("Password length must be at least 8 characters!");
            return false;
        }
        setErrorPass("");
        return true;
    };

    const checkConfirmPassword = () => {
        if (confirmPass === "") {
            setErrorConfirmPass("Password is required!");
            return false;
        }
        if (password !== confirmPass) {
            setErrorConfirmPass("Confirm password is not match!");
            return false;
        }
        setErrorConfirmPass("");
        return true;
    };

    const handleLogin = async () => {
        if (checkEmail() && checkPassword()) {
            const res = await login(email, /*CryptoJS.AES.encrypt(password, APP.SECRET_KEY).toString()*/ password);
            if (res.status === 1) {
                history.push("/");
                toast.success("Logged in successfully!");
            } else {
                toast.error(res.message);
            }
        }
        // CryptoJS.AES.decrypt("cipher", "secret-key").toString(CryptoJS.enc.Utf8);
    };

    const handleRegister = async () => {
        if (checkEmail() && checkPassword() && checkConfirmPassword()) {
            const res = await register(email, password);
            if (res.status === 1) {
                history.push("/");
                toast.success("Registered successfully!");
            } else {
                toast.error(res.message);
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
                    error={errorEmail !== ""}
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setErrorEmail("");
                    }}
                    onBlur={checkEmail}
                    helperText={errorEmail}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", marginBottom: 4 }}>
                <LockOutlinedIcon sx={{ color: "action.active", mr: 1.5, my: 0.5 }} />
                <TextField
                    error={errorPass !== ""}
                    fullWidth
                    label="Password"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setErrorPass("");
                    }}
                    onBlur={checkPassword}
                    helperText={errorPass}
                />
            </Box>
            {!isLoginPage && (
                <Box sx={{ display: "flex", alignItems: "flex-end", marginBottom: 4 }}>
                    <LockOutlinedIcon sx={{ color: "action.active", mr: 1.5, my: 0.5 }} />
                    <TextField
                        error={errorConfirmPass !== ""}
                        fullWidth
                        label="Confirm password"
                        type="password"
                        variant="standard"
                        value={confirmPass}
                        onChange={(event) => {
                            setConfirmPass(event.target.value);
                            setErrorConfirmPass("");
                        }}
                        onBlur={checkConfirmPassword}
                        helperText={errorConfirmPass}
                    />
                </Box>
            )}

            {isLoginPage ? (
                <Button variant="outlined" fullWidth onClick={handleLogin}>
                    Submit
                </Button>
            ) : (
                <Button variant="outlined" fullWidth onClick={handleRegister}>
                    Submit
                </Button>
            )}

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
        </Box>
    );
}
