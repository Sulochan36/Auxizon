import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        bookingId: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
            required: [true, "Booking reference is required"],
            unique: true,
            index: true,
        },

        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Customer reference is required"],
            index: true,
        },

        providerId: {
            type: Schema.Types.ObjectId,
            ref: "Provider",
            required: [true, "Provider reference is required"],
            index: true,
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    }
);

/*
Indexes
*/
reviewSchema.index({ providerId: 1 });
reviewSchema.index({ bookingId: 1 }, { unique: true });

/*
Prevent model overwrite during dev hot reload
*/
const Review =
    mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;