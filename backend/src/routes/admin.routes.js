import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";


const router = express.Router();

//category
router.post('/', protectRoute, requireRole('admin'), createCategory);
router.put('/:id', protectRoute, requireRole('admin'), updateCategory);
router.post('/:id/toggle', protectRoute, requireRole('admin'), toggleCategory);

//providers
router.get('/providers',protectRoute, requireRole('admin'), getAllProviders);
router.patch('/providers/:id/approve',protectRoute, requireRole('admin'), approveProvider);
router.patch('/providers/:id/reject',protectRoute, requireRole('admin'), rejectProvider);

//booking
router.get('/bookings',protectRoute, requireRole('admin'), getBookings);

export default router;