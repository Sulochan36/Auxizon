import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            index: true,
        },

        title: {
            type: String,
            required: [true, "Notification title is required"],
            trim: true,
            maxlength: 150,
        },

        message: {
            type: String,
            required: [true, "Notification message is required"],
            trim: true,
            maxlength: 500,
        },

        type: {
            type: String,
            enum: ["BOOKING", "REVIEW", "APPROVAL"],
            required: true,
            index: true,
        },

        relatedId: {
            type: Schema.Types.ObjectId,
            default: null,
        },

        isRead: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false,
    }
);

/*
Indexes for notification queries
*/
notificationSchema.index({ userId: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1 });

/*
Prevent model overwrite during dev
*/
const Notification =
    mongoose.models.Notification ||
    mongoose.model("Notification", notificationSchema);

export default Notification;