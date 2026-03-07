
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/sidebar/CustomerSidebar";
import Navbar from "../components/navbar/Navbar";

const CustomerLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">

                <Navbar />
                <CustomerSidebar />
                <main className="w-full">
                    
                        <SidebarTrigger />
                    

                    <section className="px-4 mt-30">
                        <Outlet />
                    </section>
                </main>

            </div>
        </SidebarProvider>
    );
};

export default CustomerLayout;