import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { approveProvider, createCategory, getAllProviders, getBookings, rejectProvider, toggleCategory, updateCategory } from "../controllers/admin.controller.js";


const router = express.Router();

//category
router.post('/categories', protectRoute, requireRole('admin'), createCategory);
router.put('/categories/:id', protectRoute, requireRole('admin'), updateCategory);
router.post('/categories/:id/toggle', protectRoute, requireRole('admin'), toggleCategory);

//providers
router.get('/providers',protectRoute, requireRole('admin'), getAllProviders);
router.patch('/providers/:id/approve',protectRoute, requireRole('admin'), approveProvider);
router.patch('/providers/:id/reject',protectRoute, requireRole('admin'), rejectProvider);

//booking
router.get('/bookings',protectRoute, requireRole('admin'), getBookings);

export default router;