import Booking from "../models/bookings.model.js";

export const createBooking = async (req, res) => {
    try {
        const customerId = req.user._id;

        const {
            providerId,
            categoryId,
            address,
            city,
            scheduledDate,
            scheduledTime,
            notes,
            basePrice
        } = req.body;

        const booking = await Booking.create({
            customerId,
            providerId,
            categoryId,
            address,
            city,
            scheduledDate,
            scheduledTime,
            notes,
            basePrice,
            problemImage: req.file?.path || null
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        console.log("Create booking error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const customerId = req.user._id;

        const bookings = await Booking.find({ customerId })
            .populate("providerId", "experienceYears basePrice")
            .populate("categoryId", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);

    } catch (error) {
        console.log("Fetch bookings error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBookingDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id)
            .populate({
                path: "providerId",
                populate: {
                    path: "userId",
                    select: "fullName phone email"
                }
            })
            .populate("categoryId", "name description");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);

    } catch (error) {
        console.log("Booking details error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (!["REQUESTED", "CONFIRMED"].includes(booking.status)) {
            return res.status(400).json({
                message: "Booking cannot be cancelled at this stage"
            });
        }

        booking.status = "CANCELLED";
        booking.cancellationReason = reason || "Cancelled by customer";

        await booking.save();

        res.status(200).json({
            message: "Booking cancelled successfully"
        });

    } catch (error) {
        console.log("Cancel booking error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const rescheduleBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { scheduledDate, scheduledTime } = req.body;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (!["REQUESTED", "CONFIRMED"].includes(booking.status)) {
            return res.status(400).json({
                message: "Booking cannot be rescheduled"
            });
        }

        booking.scheduledDate = scheduledDate;
        booking.scheduledTime = scheduledTime;

        await booking.save();

        res.status(200).json({
            message: "Booking rescheduled successfully",
            booking
        });

    } catch (error) {
        console.log("Reschedule booking error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//providerside

export const getAllTasks = async (req, res) => {
    try {
        const providerId = req.user.providerId;

        const tasks = await Booking.find({ providerId })
            .populate("customerId", "fullName phone")
            .populate("categoryId", "name")
            .sort({ scheduledDate: 1 });

        res.status(200).json(tasks);

    } catch (error) {
        console.log("Provider tasks error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTasksDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Booking.findById(id)
            .populate("customerId", "fullName phone email")
            .populate("categoryId", "name");

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);

    } catch (error) {
        console.log("Task details error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const acceptTask = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status !== "REQUESTED") {
            return res.status(400).json({
                message: "Booking cannot be accepted"
            });
        }

        booking.status = "CONFIRMED";

        await booking.save();

        res.status(200).json({
            message: "Booking accepted"
        });

    } catch (error) {
        console.log("Accept task error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const rejectTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "CANCELLED";
        booking.cancellationReason = reason || "Rejected by provider";

        await booking.save();

        res.status(200).json({
            message: "Booking rejected"
        });

    } catch (error) {
        console.log("Reject task error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const startTask = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status !== "CONFIRMED") {
            return res.status(400).json({
                message: "Task cannot be started"
            });
        }

        booking.status = "IN_PROGRESS";

        await booking.save();

        res.status(200).json({
            message: "Task started"
        });

    } catch (error) {
        console.log("Start task error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const completeTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { finalPrice, workNotes } = req.body;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.status !== "IN_PROGRESS") {
            return res.status(400).json({
                message: "Task cannot be completed"
            });
        }

        booking.status = "COMPLETED";
        booking.finalPrice = finalPrice;
        booking.workNotes = workNotes;
        booking.completedAt = new Date();

        await booking.save();

        res.status(200).json({
            message: "Task completed successfully"
        });

    } catch (error) {
        console.log("Complete task error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};