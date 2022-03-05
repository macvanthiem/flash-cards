import { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import Loading from "../components/Loading";
import Lessons from "../components/Lessons";
import Learning from "../components/Learning";
import Container from "@mui/material/Container";

export default function Home() {
    const [currLesson, setCurrLesson] = useState({});
    const { lessons, loading } = useFirestore();

    if (loading) {
        return <Loading />;
    }
    console.log(currLesson);
    return (
        <Container maxWidth="lg">
            {Object.keys(currLesson).length === 0 ? (
                <Lessons lessons={lessons} setCurrLesson={setCurrLesson} />
            ) : (
                <Learning currLesson={currLesson} setCurrLesson={setCurrLesson} />
            )}
        </Container>
    );
}
