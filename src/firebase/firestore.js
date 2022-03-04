import { db } from "../configs/firebase";
import { collection, addDoc } from "firebase/firestore";

export const addDocument = async (_collection, payload) => {
    try {
        const docRef = await addDoc(collection(db, _collection), payload);
        return { status: 1, data: docRef.id };
    } catch (e) {
        return { status: 0, message: e };
    }
};

export const getDocument = async () => {};
