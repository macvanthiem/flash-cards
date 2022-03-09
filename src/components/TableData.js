import { useState } from "react";
import { styled } from "@mui/material/styles";
import { uploadImg, deleteImg } from "../firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { updateDocument } from "../firebase/firestore";
import { toast } from "react-toastify";
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
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const Input = styled("input")({
    display: "none",
});

export default function TableData({ currLesson }) {
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [desc, setDesc] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currCard, setCurrCard] = useState({});
    const [previewImg, setPreviewImg] = useState("");

    const handleEdit = (card) => {
        setCurrCard(card);
        setDesc(card.desc);
        setPreviewImg(card.imgUrl);
        setOpenUpdateDialog(true);
    };

    const handleDelete = (card) => {
        if (window.confirm(`${card.desc} card will be deleted!`) === true) {
            deleteImg(card.imgName);
            const cards = currLesson.cards.filter((_card) => _card.imgName !== card.imgName);
            updateDocument("lessons", currLesson.id, { cards: cards });
            toast.success("Success!");
        }
    };

    const handlePreview = (event) => {
        setImgFile(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreviewImg(reader.result);
            }
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const checkDesc = () => {
        return currLesson.cards.filter((card) => card.desc === desc).length !== 0 && desc !== currCard.desc;
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
                (error) => toast.success(error.message),
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
                        toast.success("Success!");
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
            toast.success("Success!");
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
                                    <Tooltip title="Edit" arrow>
                                        <Button
                                            variant="outlined"
                                            sx={{ marginRight: 2 }}
                                            onClick={() => handleEdit(card)}
                                        >
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(card)}>
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
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
                    <Card sx={{ maxWidth: 180, margin: "0 auto", marginTop: 3 }}>
                        <CardMedia component="img" height="120" image={previewImg} alt="preview" />
                    </Card>
                    <Box textAlign={"center"}>
                        <label htmlFor="contained-button-file">
                            <Input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={(event) => handlePreview(event)}
                            />
                            <Button variant="contained" component="span" sx={{ marginTop: 3 }}>
                                Upload Image
                            </Button>
                        </label>
                    </Box>
                    {progress !== 0 && <Progress value={progress} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
                    <Button
                        onClick={handleUpdateCard}
                        disabled={desc === "" || (desc === currCard.desc && imgFile === null) || checkDesc()}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

TableData.propTypes = {
    currLesson: PropTypes.object,
};
