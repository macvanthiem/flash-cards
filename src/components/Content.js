import { useState } from "react";
import { styled } from "@mui/material/styles";
import { uploadImg } from "../firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { updateDocument, deleteDocument } from "../firebase/firestore";
import { toast } from "react-toastify";
import APP from "../configs/app";
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
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

const Input = styled("input")({
    display: "none",
});

export default function Content({ lessons, currLesson, setCurrLesson }) {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [desc, setDesc] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(APP.DEFAULT_IMG);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [edit, setEdit] = useState(false);

    const openEdit = () => {
        setTitle(currLesson.title);
        setEdit(true);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !checkTitle()) {
            updateDocument("lessons", currLesson.id, { title: title });
            setEdit(false);
        }
    };

    const checkTitle = () => {
        return lessons.filter((lesson) => lesson.title === title).length !== 0;
    };

    const checkDesc = () => {
        return currLesson.cards.filter((card) => card.desc === desc).length !== 0;
    };

    const handlePublicStatus = () => {
        updateDocument("lessons", currLesson.id, { isPublic: !currLesson.isPublic });
        toast.success("Success!");
    };

    const handleDeleteLesson = () => {
        if (window.confirm(`${currLesson.title} lesson will be deleted!`) === true) {
            deleteDocument("lessons", currLesson.id);
            setCurrLesson({});
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

    const handleAddCard = () => {
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
                    const cards = [...currLesson.cards];
                    cards.push({ desc: desc, imgName: imgName, imgUrl: downloadURL });
                    updateDocument("lessons", currLesson.id, { cards: cards });
                    setDesc("");
                    setImgFile(null);
                    setProgress(0);
                    setOpenAddDialog(false);
                    toast.success("Success!");
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
                            <Tooltip title="Edit" arrow>
                                <Button variant="text" onClick={openEdit}>
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Cancel" arrow>
                                <Button variant="text" onClick={() => setEdit(false)}>
                                    <CancelIcon />
                                </Button>
                            </Tooltip>
                        )}

                        {currLesson.isPublic ? (
                            <Tooltip title="Change to private" arrow>
                                <Button variant="text" onClick={handlePublicStatus}>
                                    <LockOpenOutlinedIcon color="success" />
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Change to public" arrow>
                                <Button variant="text" onClick={handlePublicStatus}>
                                    <LockOutlinedIcon color="warning" />
                                </Button>
                            </Tooltip>
                        )}
                        <Tooltip title="Delete" arrow>
                            <Button variant="text" color="error" onClick={handleDeleteLesson}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
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
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddCard} disabled={desc === "" || imgFile === null || checkDesc()}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

Content.propTypes = {
    lessons: PropTypes.array,
    currLesson: PropTypes.object,
    setCurrLesson: PropTypes.func,
};
