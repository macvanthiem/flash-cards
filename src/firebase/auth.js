import { auth } from "../configs/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { status: 1 };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};

export const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return { status: 1 };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};
