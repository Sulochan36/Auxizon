
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar";

const AdminLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                
                <AdminSidebar />

                
                    <main className="w-full">
                        <div className="p-4">
                            <SidebarTrigger />
                        </div>

                        <section className="px-4 mt-30">
                            <Outlet />
                        </section>
                    </main>
                    

            </div>
        </SidebarProvider>
    );
};

export default AdminLayout;