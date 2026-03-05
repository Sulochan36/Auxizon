import React from "react";
import { NavLink } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Calendar, User } from "lucide-react";

const CustomerSidebar = () => {
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

                        <NavLink to="/services">
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
                <NavLink to="/logout">
                    Logout
                </NavLink>
            </SidebarFooter>

        </Sidebar>
    );
};

export default CustomerSidebar;