import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Progress({ value }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", marginY: 3 }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${value}%`}</Typography>
            </Box>
        </Box>
    );
}

Progress.propTypes = {
    value: PropTypes.number,
};
