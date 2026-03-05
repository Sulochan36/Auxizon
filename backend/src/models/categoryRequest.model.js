import mongoose from "mongoose";

const { Schema } = mongoose;

const categoryRequestSchema = new Schema(
    {
        providerId: {
            type: Schema.Types.ObjectId,
            ref: "Provider",
            required: [true, "Provider reference is required"],
            index: true,
        },

        requestedName: {
            type: String,
            required: [true, "Requested category name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100,
            index: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
            index: true,
        },

        adminNote: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
Indexes for admin moderation queries
*/
categoryRequestSchema.index({ status: 1, createdAt: -1 });
categoryRequestSchema.index({ providerId: 1, status: 1 });

/*
Prevent model overwrite during dev
*/
const CategoryRequest =
    mongoose.models.CategoryRequest ||
    mongoose.model("CategoryRequest", categoryRequestSchema);

export default CategoryRequest;

// Booking.findOne({
//     providerId,
//     scheduledDate,
//     scheduledTime,
//     status: { $in: ["CONFIRMED", "IN_PROGRESS"] }
// });