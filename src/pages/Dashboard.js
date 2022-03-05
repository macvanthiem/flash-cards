import useFirestore from "../hooks/useFirestore";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Loading from "../components/Loading";

export default function PermanentDrawerLeft() {
    const { lessons, currLesson, setCurrLesson, loading } = useFirestore();

    if (loading) {
        return <Loading />;
    }
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar lessons={lessons} setCurrLesson={setCurrLesson} />
            <Content currLesson={currLesson} />
        </Box>
    );
}
