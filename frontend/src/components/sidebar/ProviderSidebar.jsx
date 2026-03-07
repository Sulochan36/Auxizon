import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    ClipboardList,
    Hammer,
    CheckCircle,
    Wallet,
    Star,
    Bell,
    User
} from "lucide-react";
import { logoutUser } from "../../api/authApi";
import { Button } from "../ui/button";

const ProviderSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };
    return (
        <Sidebar>

            {/* Header */}
            <SidebarHeader>
                <h2 className="text-xl font-semibold">Auxizon</h2>
            </SidebarHeader>

            <SidebarContent>

                {/* Work Management */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/provider/dashboard">
                            Dashboard
                        </NavLink>

                        <NavLink to="/provider/requests">
                            Service Requests
                        </NavLink>

                        <NavLink to="/provider/active-jobs">
                            Active Jobs
                        </NavLink>

                        <NavLink to="/provider/completed-jobs">
                            Completed Jobs
                        </NavLink>

                    </nav>
                </SidebarGroup>

                {/* Business */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/provider/earnings">
                            Earnings
                        </NavLink>

                        <NavLink to="/provider/reviews">
                            Reviews
                        </NavLink>

                        <NavLink to="/provider/notifications">
                            Notifications
                        </NavLink>

                    </nav>
                </SidebarGroup>

                {/* Account */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/provider/profile">
                            Profile
                        </NavLink>

                    </nav>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </SidebarFooter>

        </Sidebar>
    );
};

export default ProviderSidebar;