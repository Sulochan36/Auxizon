import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
            lowercase: true,
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

        imageUrl: {
            type: String,
            default: null,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Creator (admin) is required"],
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
Indexes
*/
categorySchema.index({ name: 1 }, { unique: true });

/*
Prevent model overwrite during dev hot reload
*/
const Category =
    mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;