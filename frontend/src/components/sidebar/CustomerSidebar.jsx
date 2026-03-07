import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Calendar, User } from "lucide-react";
import { Button } from "../ui/button";
import { logoutUser } from "../../api/authApi";

const CustomerSidebar = () => {
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

            {/* Content */}
            <SidebarContent>

                {/* Main Navigation */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/customer/dashboard">Dashboard</NavLink>

                        <NavLink to="/category-page">
                            Book Service
                        </NavLink>

                        <NavLink to="/customer/bookings">
                            My Bookings
                        </NavLink>

                        <NavLink to="/customer/completed-services">
                            Completed Services
                        </NavLink>

                        <NavLink to="/customer/reviews">
                            My Reviews
                        </NavLink>

                    </nav>
                </SidebarGroup>

                {/* Account */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/customer/notifications">
                            Notifications
                        </NavLink>

                        <NavLink to="/customer/profile">
                            Profile
                        </NavLink>

                    </nav>
                </SidebarGroup>

            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </SidebarFooter>

        </Sidebar>
    );
};

export default CustomerSidebar;