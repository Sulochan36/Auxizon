
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import ProviderSidebar from "../components/sidebar/ProviderSidebar";
import Navbar from "../components/navbar/Navbar";

const ProviderLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">

                <ProviderSidebar />
                <Navbar/>
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

export default ProviderLayout;