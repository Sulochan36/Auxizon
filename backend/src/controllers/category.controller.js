import Category from "../models/categories.model.js";
import Provider from "../models/providers.model.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const getCategoryDetail = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category detail:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProvidersByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json({ message: "categoryId query parameter is required" });
        }

        const providers = await Provider.find({ categoryId, approvalStatus: "APPROVED" })
            .populate("userId", "fullName email phone city")   // basic user info
            .populate("categoryId", "name description");       // category info

        res.status(200).json(providers);
    } catch (error) {
        console.error("Error fetching providers by category:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
