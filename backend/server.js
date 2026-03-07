import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from './src/config/connectDB.js';

import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
// import providerRoutes from "./src/routes/provider.routes.js";
// import userRoutes from "./src/routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", bookingRoutes);
// app.use("/api/provider", providerRoutes);
// app.use("/api/users", userRoutes);



app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port ", PORT);

});