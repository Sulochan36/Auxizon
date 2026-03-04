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
        </>
    )
);