import mongoose from "mongoose";

const { Schema } = mongoose;

const providerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            index: true,
        },

        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category reference is required"],
            index: true,
        },

        experienceYears: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        bio: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        basePrice: {
            type: Number,
            required: true,
            min: 0,
            index: true,
        },

        serviceAreas: [
            {
                type: String,
                trim: true,
            },
        ],

        availabilityStatus: {
            type: String,
            enum: ["ONLINE", "OFFLINE"],
            default: "OFFLINE",
            index: true,
        },

        approvalStatus: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
            index: true,
        },

        rejectionReason: {
            type: String,
            trim: true,
            default: null,
        },

        governmentIdNumber: {
            type: String,
            required: [true, "Government ID is required"],
            trim: true,
            index: true,
        },

        idProofImage: {
            type: String,
            required: true,
        },

        workSamples: [
            {
                type: String,
            },
        ],

        avgRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
            index: true,
        },

        totalReviews: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
Indexes for common queries
*/
providerSchema.index({ categoryId: 1, approvalStatus: 1 });
providerSchema.index({ serviceAreas: 1 });
providerSchema.index({ avgRating: -1 });

/*
Prevent model overwrite in dev
*/
const Provider =
    mongoose.models.Provider || mongoose.model("Provider", providerSchema);

export default Provider;