import Category from "../models/categories.model.js";
import Provider from "../models/providers.model.js";
import User from "../models/users.model.js";
import Booking from "../models/bookings.model.js";

export const createCategory = async (req,res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingCategory = await Category.findOne({
            $or: [{ name }],
        });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category with this name already exists",
            });
        }

        const newCategory = new Category({
            name: name.toLowerCase(),
            description,
            createdBy: req.user._id,
        })

        await newCategory.save();

        res.status(201).json({
            name: newCategory.name,
            description: newCategory.description,
            createdBy: newCategory.createdBy,
        })

    } catch (error) {
        console.log("Error in Category creation:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name.toLowerCase();
        category.description = description;

        await category.save();

        res.status(200).json({
            name: category.name,
            description: category.description,
            createdBy: category.createdBy,
        });
    } catch (error) {
        console.log("Error updating category:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const toggleCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.isActive = !category.isActive;
        await category.save();

        res.status(200).json({
            message: `Category is now ${category.isActive ? "active" : "inactive"}`,
            isActive: category.isActive,
        });
    } catch (error) {
        console.log("Error toggling category:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


//for providers


export const getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find()
            .populate("userId", "fullName email phone city") // populate basic user info
            .populate("categoryId", "name description");     // populate category info

        res.status(200).json(providers);
    } catch (error) {
        console.log("Error fetching providers:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const approveProvider = async (req, res) => {
    try {
        const { id } = req.params;

        const provider = await Provider.findById(id);
        if (!provider) return res.status(404).json({ message: "Provider not found" });

        provider.approvalStatus = "APPROVED";
        provider.rejectionReason = null;
        await provider.save();

        res.status(200).json({ message: "Provider approved", providerId: provider._id });
    } catch (error) {
        console.log("Error approving provider:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const rejectProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const reason = req.body?.reason || "No reason provided";

        const provider = await Provider.findById(id);
        if (!provider) return res.status(404).json({ message: "Provider not found" });

        provider.approvalStatus = "REJECTED";
        provider.rejectionReason = reason 
        await provider.save();

        res.status(200).json({ message: "Provider rejected", providerId: provider._id });
    } catch (error) {
        console.log("Error rejecting provider:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


//forBookings

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("customerId", "fullName email phone city")  
            .populate({
                path: "providerId",
                populate: { path: "userId", select: "fullName email phone city" }
            })
            .populate("categoryId", "name description")            
            .sort({ createdAt: -1 });                              

        res.status(200).json(bookings);
    } catch (error) {
        console.log("Error fetching bookings:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
