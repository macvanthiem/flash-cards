import { useState, useEffect } from "react";
import { db } from "../configs/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

export default function useFirestore() {
    const [lessons, setLessons] = useState([]);
    const [currLesson, setCurrLesson] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let collectionRef = query(collection(db, "lessons"));
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setLessons(data);
            if (data.length > 0) {
                setCurrLesson(data[0]);
            }
            setLoading(false);
        });

        return unsub;
    }, []);

    return { lessons, currLesson, setCurrLesson, loading };
}
