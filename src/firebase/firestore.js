import { db } from "../configs/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export const addDocument = async (_collection, payload) => {
    try {
        const docRef = await addDoc(collection(db, _collection), payload);
        return { status: 1, data: docRef.id };
    } catch (e) {
        return { status: 0, message: e };
    }
};

export const updateDocument = async (_collection, docId, payload) => {
    try {
        await updateDoc(doc(db, _collection, docId), payload);
        return { status: 1 };
    } catch (error) {
        return { status: 0 };
    }
};
