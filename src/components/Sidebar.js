import { useState } from "react";
import { addDocument } from "../firebase/firestore";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Sidebar({ lessons, setCurrLesson }) {
    const [title, setTitle] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const colorPriamry = blue[700];
    const drawerWidth = 240;

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !checkTitle()) {
            handleAddLesson();
        }
    };

    const checkTitle = () => {
        return lessons.filter((lesson) => lesson.title === title).length !== 0;
    };

    const handleAddLesson = async () => {
        const { status } = await addDocument("lessons", { title: title, cards: [], isPublic: false });
        if (status === 1) {
            setTitle("");
            setOpenDialog(false);
            toast.success("Success!");
        } else {
            toast.error("Fail!");
        }
    };

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar sx={{ backgroundColor: colorPriamry }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className="link link-white" to="/">
                            Flash Cards
                        </Link>
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {lessons.length > 0 &&
                        lessons.map((lesson) => (
                            <ListItem button key={lesson.id} onClick={() => setCurrLesson(lesson)}>
                                <ListItemIcon>
                                    <BurstModeOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={lesson.title} />
                                <Chip label={lesson.cards.length} color="primary" variant="outlined" size="small" />
                            </ListItem>
                        ))}
                    <ListItem button onClick={() => setOpenDialog(true)}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Add new lesson"} />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <Dialog open={openDialog} maxWidth="xs" fullWidth={true}>
                <DialogTitle>Add new lesson </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Title"
                        variant="standard"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddLesson} disabled={title === "" || checkTitle()}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
Sidebar.propTypes = {
    lessons: PropTypes.array,
    setCurrLesson: PropTypes.func,
};
