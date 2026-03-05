import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import Signup from "./pages/public/Signup";
import Login from "./pages/public/Login";
import CategoryDetail from "./pages/public/CategoryDetail";
import CategoryPage from "./pages/public/CategoryPage";
import ProviderDetail from "./pages/public/ProviderDetail";
import RegisterCustomer from "./pages/public/RegisterCustomer";
import RegisterProvider from "./pages/public/RegisterProvider";
import ProtectedRoute from "./ProtectedRoutes";
import CustomerLayout from "./layouts/CustomerLayout";
import ProviderLayout from "./layouts/ProviderLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register-customer" element={<RegisterCustomer />} />
                <Route path="/register-provider" element={<RegisterProvider />} />
                <Route path="/category-detail" element={<CategoryDetail />} />
                <Route path="/category-page" element={<CategoryPage />} />
                <Route path="/provider-detail" element={<ProviderDetail />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<CustomerLayout />}>
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<ProviderLayout />}>
                    <Route path="/dashboard" element={<ProviderDashboard />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout/>}>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                </Route>
            </Route>
        </>
    )
);