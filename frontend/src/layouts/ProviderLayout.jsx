
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import ProviderSidebar from "../components/sidebar/ProviderSidebar";

const ProviderLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">

                <ProviderSidebar />

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

export default ProviderLayout;