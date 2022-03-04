import { Link } from "react-router-dom";
export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <Link to="/abc">abc</Link> <Link to="/dashboard">abcd</Link>
        </>
    );
}
