import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { logoutUser } from "../../api/authApi";
import { Button } from "../ui/button";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };
    return (
        <Sidebar>

            {/* Header */}
            <SidebarHeader>
                <h2 className="text-xl font-semibold">Auxizon Admin</h2>
            </SidebarHeader>

            <SidebarContent>

                {/* Platform Overview */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/admin/dashboard">
                            Dashboard
                        </NavLink>

                        {/* <NavLink to="/admin/analytics">
                            Analytics
                        </NavLink> */}

                    </nav>
                </SidebarGroup>

                {/* User Management */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/admin/customers">
                            Customers
                        </NavLink>

                        <NavLink to="/admin/providers">
                            Providers
                        </NavLink>

                        <NavLink to="/admin/categories">
                            Categories
                        </NavLink>

                        <NavLink to="/admin/bookings">
                            Bookings
                        </NavLink>

                        

                    </nav>
                </SidebarGroup>

                {/* Platform Management */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/admin/provider-requests">
                            Provider Requests
                        </NavLink>

                        <NavLink to="/admin/category-requests">
                            Category Requests
                        </NavLink>

                        <NavLink to="/admin/reviews">
                            Reviews
                        </NavLink>

                    </nav>
                </SidebarGroup>

                {/* System */}
                <SidebarGroup>
                    <nav className="flex flex-col gap-2">

                        <NavLink to="/admin/notifications">
                            Notifications
                        </NavLink>

                        <NavLink to="/admin/settings">
                            Settings
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

export default AdminSidebar;