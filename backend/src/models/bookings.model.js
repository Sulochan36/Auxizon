import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Customer is required"],
            index: true,
        },

        providerId: {
            type: Schema.Types.ObjectId,
            ref: "Provider",
            required: [true, "Provider is required"],
            index: true,
        },

        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
            index: true,
        },

        address: {
            type: String,
            required: [true, "Service address is required"],
            trim: true,
            maxlength: 300,
        },

        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
            index: true,
        },

        scheduledDate: {
            type: Date,
            required: [true, "Scheduled date is required"],
            index: true,
        },

        scheduledTime: {
            type: String,
            required: [true, "Scheduled time is required"],
            trim: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },

        problemImage: {
            type: String,
            default: null,
        },

        basePrice: {
            type: Number,
            required: true,
            min: 0,
        },

        finalPrice: {
            type: Number,
            min: 0,
            default: null,
        },

        status: {
            type: String,
            enum: [
                "REQUESTED",
                "CONFIRMED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
            ],
            default: "REQUESTED",
            index: true,
        },

        cancellationReason: {
            type: String,
            trim: true,
            default: null,
        },

        workNotes: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },

        beforeImages: [
            {
                type: String,
            },
        ],

        afterImages: [
            {
                type: String,
            },
        ],

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
Indexes for performance
*/
bookingSchema.index({ customerId: 1 });
bookingSchema.index({ providerId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledDate: 1 });

/*
Compound indexes for common queries
*/
bookingSchema.index({ providerId: 1, scheduledDate: 1 });
bookingSchema.index({ customerId: 1, createdAt: -1 });
bookingSchema.index({ providerId: 1, status: 1 });

/*
Prevent model overwrite during hot reload
*/
const Booking =
    mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;