import { useState } from "react";
import Box from "@mui/material/Box";
import ReactCardFlip from "react-card-flip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stack from "@mui/material/Stack";

export default function FlashCard() {
    const [flip, setFlip] = useState(false);

    const handleFlip = () => {
        const audioElement = document.getElementById("sound");
        audioElement.volume = 0.75;
        audioElement.currentTime = 0;
        audioElement.play();
        setFlip(!flip);
    };

    return (
        <Box sx={{ width: 360, margin: "0 auto", marginTop: "100px" }}>
            <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                <Card sx={{ maxWidth: 360, cursor: "pointer" }} onClick={handleFlip}>
                    <CardMedia
                        component="img"
                        height="240"
                        image="https://firebasestorage.googleapis.com/v0/b/datn-p1.appspot.com/o/dog-1.jpg?alt=media&token=2876b9d2-93e6-4c3f-9d0d-493a0fff241a"
                        alt="green iguana"
                    />
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
                            Lizard
                        </Typography>
                    </CardContent>
                </Card>
            </ReactCardFlip>
            <Stack direction="row" spacing={2} marginTop={3} justifyContent="center">
                <Button variant="contained" startIcon={<DoneIcon />}>
                    Done
                </Button>
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                    Next
                </Button>
            </Stack>
            <audio id="sound" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"></audio>
        </Box>
    );
}
