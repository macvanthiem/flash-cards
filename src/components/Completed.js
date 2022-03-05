import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Completed({ setCurrLesson }) {
    return (
        <Box sx={{ width: 360, margin: "0 auto" }}>
            <Card>
                <CardContent sx={{ textAlign: "center" }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 80, marginBottom: 2 }} />
                    <Typography variant="h5" component="h1" marginBottom={3} align="center">
                        Completed!
                    </Typography>
                </CardContent>
                <Box textAlign="center" marginBottom={2}>
                    <Button onClick={() => setCurrLesson({})}>Continue</Button>
                </Box>
            </Card>
        </Box>
    );
}

Completed.propTypes = {
    setCurrLesson: PropTypes.func,
};
