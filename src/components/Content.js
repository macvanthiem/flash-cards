import { useState } from "react";
import { styled } from "@mui/material/styles";
import { uploadImg } from "../firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { updateDocument } from "../firebase/firestore";
import TableData from "./TableData";
import Progress from "./Progress";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const Input = styled("input")({
    display: "none",
});

export default function Content({ currLesson }) {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [desc, setDesc] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [edit, setEdit] = useState(false);

    const openEdit = () => {
        setTitle(currLesson.title);
        setEdit(true);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            updateDocument("lessons", currLesson.id, { title: title });
            setEdit(false);
        }
    };

    const handleAddCard = () => {
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
                    const cards = [...currLesson.cards];
                    cards.push({ desc: desc, imgName: imgName, imgUrl: downloadURL });
                    updateDocument("lessons", currLesson.id, { cards: cards });
                    setDesc("");
                    setImgFile(null);
                    setProgress(0);
                    setOpenAddDialog(false);
                });
            }
        );
    };

    if (Object.keys(currLesson).length === 0) {
        return (
            <Typography variant="h4" component="h1" marginLeft={3} marginTop={3}>
                Manage Lessons
            </Typography>
        );
    }
    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Box sx={{ marginBottom: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                        {!edit ? (
                            <Typography variant="h4" component="h1" marginRight={3}>
                                {currLesson.title}
                            </Typography>
                        ) : (
                            <TextField
                                autoFocus
                                label="Title"
                                variant="standard"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                sx={{ marginRight: 3 }}
                                onKeyPress={handleKeyPress}
                            />
                        )}

                        {!edit ? (
                            <Button variant="text" onClick={openEdit}>
                                <EditIcon fontSize="large" />
                            </Button>
                        ) : (
                            <Button variant="text" onClick={() => setEdit(false)}>
                                <CancelIcon fontSize="large" />
                            </Button>
                        )}
                    </Box>

                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>
                        Add new card
                    </Button>
                </Box>
                <TableData currLesson={currLesson} />
            </Box>
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="xs" fullWidth={true}>
                <DialogTitle>Add new flash card </DialogTitle>
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
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddCard} disabled={desc === "" || imgFile === null}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

Content.propTypes = {
    currLesson: PropTypes.object,
};
