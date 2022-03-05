import PropTypes from "prop-types";
import Item from "./Item";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Lessons({ lessons, setCurrLesson }) {
    return (
        <Box sx={{ paddingX: 2, marginY: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {lessons.length > 0 &&
                        lessons.map((lesson, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Item lesson={lesson} setCurrLesson={setCurrLesson} />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </Box>
    );
}

Lessons.propTypes = {
    lessons: PropTypes.array,
    setCurrLesson: PropTypes.func,
};
