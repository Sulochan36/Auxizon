// import express from "express";
// import { protectRoute } from "../middlewares/auth.middleware.js";
// import { requireRole } from "../middlewares/role.middleware.js";


// const router = express.Router();


// router.get('/customer',protectRoute,requireRole('admin'), getAllCustomers);
// router.get('/customer/profile',protectRoute, getCustomerDetails);

// router.get('/customer/dashboard', protectRoute, requireRole('customer'));
// router.get('/provider/dashboard',protectRoute, requireRole('provider'));
// router.get('/admin/dashboard',protectRoute, requireRole('admin'));

// export default router;