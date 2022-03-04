import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function NotFound() {
    return (
        <Paper sx={{ width: "400px", margin: "0 auto", overflow: "hidden", marginTop: "100px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
                marginY={5}
            >
                <Typography variant="h1" component="h2" color="text.secondary" fontWeight={700}>
                    4
                </Typography>
                <Typography variant="h1" component="h2" color="#009be5" fontWeight={700}>
                    0
                </Typography>
                <Typography variant="h1" component="h2" color="text.secondary" fontWeight={700}>
                    4
                </Typography>
            </Box>
            <Typography color="text.secondary" align="center" marginY={5} marginX={2}>
                THE PAGE YOU REQUESTED COULD NOT FOUND
            </Typography>
        </Paper>
    );
}
