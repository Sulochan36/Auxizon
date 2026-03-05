// import express from "express";
// import { protectRoute } from "../middlewares/auth.middleware.js";
// import { requireRole } from "../middlewares/role.middleware.js";


// const router = express.Router();

// router.post('/customer/bookings',protectRoute, requireRole('customer'), createBooking);
// router.get('/customer/bookings',protectRoute, requireRole('customer'), getAllBookings);
// router.get('/customer/bookings/:id',protectRoute, requireRole('customer'), getBookingDetails);
// router.patch('/customer/bookings/:id/cancel',protectRoute, requireRole('customer'), cancelBooking);
// router.patch('/customer/bookings/:id/reschedule',protectRoute, requireRole('customer'), rescheduleBooking);

// router.get('/provider/bookings', protectRoute, requireRole('provider'), getAllTasks);
// router.get('/provider/bookings/:id', protectRoute, requireRole('provider'), getTaskDetails);
// router.patch('/provider/bookings/:id/accept', protectRoute, requireRole('provider'), acceptTask);
// router.patch('/provider/bookings/:id/reject', protectRoute, requireRole('provider'), rejectTask);
// router.patch('/provider/bookings/:id/start', protectRoute, requireRole('provider'), startTask);
// router.patch('/provider/bookings/:id/complete', protectRoute, requireRole('provider'), completeTask);


// export default router;