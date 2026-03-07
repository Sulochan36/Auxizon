
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
const AdminLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AdminSidebar />
                <ToastContainer />
                <div className="w-full">
                    <Navbar />

                    <main className="mt-16 px-4">
                            <SidebarTrigger />
                            <Outlet />
                    </main>
                </div>
                
            </div>
        </SidebarProvider>
    );
};

export default AdminLayout;