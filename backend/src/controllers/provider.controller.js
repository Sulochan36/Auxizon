import mongoose from "mongoose";
import Provider from "../models/providers.model";
import User from "../models/users.model";

export const getProviderProfile = async(req,res) => {
    try {
        const userId = req.user._id;

        const provider = await Provider.findOne({ userId })
            .populate("userId", "name email phone profileImage")
            .populate("categoryId", "name");

        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: provider,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

export const updateProviderProfile = async(req,res) => {
    try {
        const userId = req.user._id;

        const {
            email,
            phone,
            city,
            profileImage,
            experienceYears,
            bio,
            basePrice,
            serviceAreas,
            availabilityStatus,

        } = req.body;

        const user = await User.findOne({ _id: userId });

        if(!user){
            return res.status(404).json({
                message: "Provider Profile not found"
            })
        }

        const provider = await Provider.findOne({userId});

        if (!provider) {
            return res.status(404).json({
                message: "Provider profile not found"
            })
        }

        // update user fields
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;
        if (city !== undefined) user.city = city;
        if (profileImage !== undefined) user.profileImage = profileImage;

        // update provider fields
        if (experienceYears !== undefined) provider.experienceYears = experienceYears;
        if (bio !== undefined) provider.bio = bio;
        if (basePrice !== undefined) provider.basePrice = basePrice;
        if (serviceAreas !== undefined) provider.serviceAreas = serviceAreas;
        if (availabilityStatus !== undefined) provider.availabilityStatus = availabilityStatus;

        await user.save();
        await provider.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user, provider
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


export const getProviders = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                message: "Invalid category id"
            });
        }

        const providers = await Provider.find({ categoryId, approvalStatus: "APPROVED" })
            .populate("userId", "name phone city profileImage")
            .sort({ avgRating: -1 })
            .lean();

        if (!providers.length) {
            return res.status(404).json({
                message: "No providers found for this category"
            });
        }

        res.status(200).json({
            success: true,
            count: providers.length,
            data: providers
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }


}

export const getProviderDetails = async (req, res) => {
    try {

        const { id: providerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(providerId)) {
            return res.status(400).json({
                message: "Invalid provider id"
            });
        }


        const provider = await Provider.findById(providerId)
            .populate("userId", "name phone city profileImage")
            .populate("categoryId", "name")
            .lean();

    
        if (!provider) {
            return res.status(404).json({
                message: "Provider not found"
            });
        }

        if (provider.approvalStatus !== "APPROVED") {
            return res.status(403).json({
                message: "Provider is not available"
            });
        }

        res.status(200).json({
            success: true,
            data: provider
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

// export const toggleProviderStatus = async (req, res) => {
//     try {
//         const userId = req.user._id;


//     } catch (error) {
        
//     }
// }

export const getCategoryRequest = async (req, res) => {
    
}

export const applyCategoryRequest = async (req, res) => {

}