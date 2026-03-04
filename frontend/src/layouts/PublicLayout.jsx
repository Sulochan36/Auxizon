import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";


const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <section className="px-4 mt-30 min-h-screen">
                <Outlet />
            </section>
        </>
    );
}

export default PublicLayout