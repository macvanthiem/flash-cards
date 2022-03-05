import { useState } from "react";
import PropTypes from "prop-types";
import FlashCard from "./FlashCard";
import Completed from "./Completed";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

export default function Learning({ currLesson, setCurrLesson }) {
    const [index, setIndex] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleNext = () => {
        if (currLesson.cards.length - 1 === index) {
            setCompleted(true);
        } else {
            setIndex(index + 1);
        }
    };

    if (Object.keys(currLesson).length === 0) {
        return (
            <Typography variant="h4" component="h1" marginBottom={3} align="center">
                No data to display!
            </Typography>
        );
    }

    return (
        <Box sx={{ paddingX: 2, marginY: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", marginBottom: 10 }}>
                <IconButton onClick={() => setCurrLesson({})} sx={{ marginRight: 2 }}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
                <Typography variant="h4" component="div" color="primary">
                    {currLesson?.title}
                </Typography>
            </Box>
            {!completed ? (
                <FlashCard card={currLesson.cards[index]} handleNext={handleNext} />
            ) : (
                <Completed setCurrLesson={setCurrLesson} />
            )}
        </Box>
    );
}

Learning.propTypes = {
    currLesson: PropTypes.object,
    setCurrLesson: PropTypes.func,
};
