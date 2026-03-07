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
import Customers from "./pages/admin/Customers";
import Categories from "./pages/admin/Categories";
import Bookings from "./pages/admin/Bookings";
import Reviews from "./pages/admin/Reviews";
import CategoryRequests from "./pages/admin/CategoryRequests";
import ProviderRequests from "./pages/admin/ProviderRequests";
import Providers from "./pages/admin/Providers";
import BookingForm from "./pages/customer/BookingPage";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register-customer" element={<RegisterCustomer />} />
                <Route path="/register-provider" element={<RegisterProvider />} />
                <Route path="/category-detail/:id" element={<CategoryDetail />} />
                <Route path="/category-page" element={<CategoryPage />} />
                <Route path="/provider-detail" element={<ProviderDetail />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<CustomerLayout />}>
                    <Route path="customer/dashboard" element={<CustomerDashboard />} />
                    <Route path="customer/createBooking/:providerId" element={<BookingForm />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<ProviderLayout />}>
                    <Route path="provider/dashboard" element={<ProviderDashboard />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout/>}>
                    <Route path="admin/dashboard" element={<AdminDashboard />} />
                    <Route path="admin/customers" element={<Customers />} />
                    <Route path="admin/providers" element={<Providers />} />
                    <Route path="admin/categories" element={<Categories/>} />
                    <Route path="admin/bookings" element={<Bookings />} />
                    <Route path="admin/provider-requests" element={<ProviderRequests />} />
                    <Route path="admin/category-requests" element={<CategoryRequests />} />
                    <Route path="admin/reviews" element={<Reviews />} />
                </Route>
            </Route>
        </>
    )
);