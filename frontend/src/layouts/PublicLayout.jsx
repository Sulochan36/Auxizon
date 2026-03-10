import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";


const PublicLayout = () => {
    return (
        <>
            <Navbar />
            
            <section className="px-4 mt-12 min-h-screen bg-gray-100">
                <Outlet />
            </section>
        </>
    );
}

export default PublicLayout