import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function Item({ lesson, setCurrLesson }) {
    return (
        <Card sx={{ cursor: "pointer" }} onClick={() => setCurrLesson(lesson)}>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3, paddingTop: 1 }}>
                    <AvatarGroup max={5}>
                        {lesson?.cards.map((card, index) => (
                            <Avatar key={index} alt={card.desc} src={card.imgUrl} sx={{ width: 56, height: 56 }} />
                        ))}
                    </AvatarGroup>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h6" component="div" color="primary" marginRight={2}>
                        {lesson?.title}
                    </Typography>
                    <Chip label={lesson?.cards.length} color="primary" variant="outlined" size="small" />
                </Box>
            </CardContent>
        </Card>
    );
}

Item.propTypes = {
    lesson: PropTypes.object,
    setCurrLesson: PropTypes.func,
};
