import { useState } from "react";
import PropTypes from "prop-types";
import ReactCardFlip from "react-card-flip";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import Stack from "@mui/material/Stack";

export default function FlashCard({ card, handleNext }) {
    const [flip, setFlip] = useState(false);

    const handleFlip = () => {
        const audioElement = document.getElementById("sound");
        audioElement.volume = 0.75;
        audioElement.currentTime = 0;
        audioElement.play();
        setFlip(!flip);
    };

    return (
        <Box sx={{ width: 360, margin: "0 auto" }}>
            <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                <Card sx={{ maxWidth: 360, cursor: "pointer" }} onClick={handleFlip}>
                    <CardMedia component="img" height="240" image={card.imgUrl} alt="green iguana" />
                </Card>
                <Card sx={{ maxWidth: 360, cursor: "pointer" }} onClick={handleFlip}>
                    <CardContent
                        sx={{
                            height: "240px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            {card.desc}
                        </Typography>
                    </CardContent>
                </Card>
            </ReactCardFlip>
            <Stack direction="row" spacing={2} marginTop={3} justifyContent="center">
                <Button onClick={handleNext} variant="contained" startIcon={<DoneIcon />}>
                    Done
                </Button>
            </Stack>
            <audio id="sound" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"></audio>
        </Box>
    );
}

FlashCard.propTypes = {
    card: PropTypes.object,
    handleNext: PropTypes.func,
};
