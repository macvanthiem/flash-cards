import { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Loading from "../components/Loading";

export default function PermanentDrawerLeft() {
    const [currLesson, setCurrLesson] = useState({});
    const { lessons, loading } = useFirestore();

    useEffect(() => {
        if (Object.keys(currLesson).length === 0) return;
        lessons.forEach((lesson) => {
            if (lesson.id === currLesson.id) {
                setCurrLesson(lesson);
                return;
            }
        });
    }, [currLesson, lessons]);

    if (loading) {
        return <Loading />;
    }
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar lessons={lessons} setCurrLesson={setCurrLesson} />
            <Content lessons={lessons} currLesson={currLesson} setCurrLesson={setCurrLesson} />
        </Box>
    );
}
