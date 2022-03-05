// import {useState} from "react";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";
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

export default function Sidebar({ lessons, setCurrLesson }) {
    // const [title, setTitle] = useState("");
    const colorPriamry = blue[700];
    const drawerWidth = 240;
    return (
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
                <ListItem button>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add new"} />
                </ListItem>
            </List>
            <Divider />
        </Drawer>
    );
}
Sidebar.propTypes = {
    lessons: PropTypes.array,
    setCurrLesson: PropTypes.func,
};
