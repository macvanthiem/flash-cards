import { useState } from "react";
import { styled } from "@mui/material/styles";
import { uploadImg, deleteImg } from "../firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { updateDocument } from "../firebase/firestore";
import PropTypes from "prop-types";
import Progress from "./Progress";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

const Input = styled("input")({
    display: "none",
});

export default function TableData({ currLesson }) {
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [desc, setDesc] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [currCard, setCurrCard] = useState({});

    const handleEdit = (card) => {
        setCurrCard(card);
        setDesc(card.desc);
        setOpenUpdateDialog(true);
    };

    const handleDelete = (card) => {
        if (window.confirm(`${card.desc} card will be deleted!`) === true) {
            deleteImg(card.imgName);
            const cards = currLesson.cards.filter((_card) => _card.imgName !== card.imgName);
            updateDocument("lessons", currLesson.id, { cards: cards });
        }
    };

    const handleUpdateCard = () => {
        if (imgFile) {
            const imgName = `${Date.now()}-${imgFile.name}`;
            const uploadTask = uploadImg(imgFile, imgName);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(prog);
                },
                (error) => setError(error.message),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        deleteImg(currCard.imgName);
                        const cards = [...currLesson.cards];
                        cards.forEach((card) => {
                            if (card.imgName === currCard.imgName) {
                                card.imgName = imgName;
                                card.imgUrl = downloadURL;
                                card.desc = desc;
                            }
                        });
                        updateDocument("lessons", currLesson.id, { cards: cards });
                        setDesc("");
                        setImgFile(null);
                        setProgress(0);
                        setOpenUpdateDialog(false);
                    });
                }
            );
        } else {
            const cards = [...currLesson.cards];
            cards.forEach((card) => {
                if (card.imgName === currCard.imgName) {
                    card.desc = desc;
                }
            });
            updateDocument("lessons", currLesson.id, { cards: cards });
            setDesc("");
            setImgFile(null);
            setProgress(0);
            setOpenUpdateDialog(false);
        }
    };
    return (
        <>
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
                                    <Button variant="outlined" sx={{ marginRight: 2 }} onClick={() => handleEdit(card)}>
                                        <EditIcon />
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(card)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} maxWidth="xs" fullWidth={true}>
                <DialogTitle>Update flash card </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Description"
                        variant="standard"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                    />

                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            onChange={(event) => setImgFile(event.target.files[0])}
                        />
                        <Button variant="contained" component="span" sx={{ marginTop: 3 }}>
                            Upload Image
                        </Button>
                    </label>

                    {progress !== 0 && <Progress value={progress} />}

                    {error && (
                        <Alert severity="error" sx={{ marginTop: 3 }}>
                            {error}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdateCard}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

TableData.propTypes = {
    currLesson: PropTypes.object,
};
