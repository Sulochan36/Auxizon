
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/sidebar/CustomerSidebar";

const CustomerLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">

                <CustomerSidebar />

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

export default CustomerLayout;