import PropTypes from "prop-types";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.object,
};
