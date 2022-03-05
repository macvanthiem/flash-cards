import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Content({ currLesson }) {
    if (Object.keys(currLesson).length === 0) {
        return (
            <Typography variant="h4" component="h1" marginBottom={3} align="center">
                No data to display!
            </Typography>
        );
    }
    return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            <Typography variant="h4" component="h1" marginBottom={3}>
                {currLesson.title}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currLesson.cards.map((card, i) => (
                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {++i}
                                </TableCell>
                                <TableCell align="center">{card.desc}</TableCell>
                                <TableCell align="center">
                                    <Card sx={{ maxWidth: 180, margin: "0 auto" }}>
                                        <CardMedia component="img" height="120" image={card.imgUrl} alt={card.desc} />
                                    </Card>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" sx={{ marginRight: 2 }}>
                                        <EditIcon />
                                    </Button>
                                    <Button variant="outlined" color="error">
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

Content.propTypes = {
    currLesson: PropTypes.object,
};
