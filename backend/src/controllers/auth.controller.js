import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import Provider from "../models/providers.model.js";


export const signupCustomer = async (req, res) => {
    try {
        const { fullName, email, password, phone, city, role } = req.body;

        if (!fullName || !email || !password || !phone || !city) {
            return res.status(400).json({
                message: "Full name, email, password, phone and city are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or phone already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            phone,
            city,
            role: role || "customer",
        });

        await newUser.save();

        generateAccessToken(newUser._id, res);
        generateRefreshToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            city: newUser.city,
            phone: newUser.phone,
            profileImage: newUser.profileImage,
        });
    } catch (error) {
        console.log("Signup error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const providerSignup = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            password,
            city,

            categoryId,
            experienceYears,
            basePrice,
            serviceAreas,
            bio,
            governmentIdNumber
        } = req.body;

        // check existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            city,
            role: "provider"
        });

        // create provider profile
        const provider = await Provider.create({
            userId: user._id,
            categoryId,
            experienceYears,
            basePrice,
            serviceAreas,
            bio,
            governmentIdNumber,
            idProofImage: req.files?.idProofImage?.[0]?.path
        });

        res.status(201).json({
            message: "Provider registered successfully. Awaiting approval.",
            userId: user._id,
            providerId: provider._id
        });

    } catch (error) {
        console.log("Provider signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        generateAccessToken(user._id, res);
        generateRefreshToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            city: user.city,
            phone: user.phone,
            profileImage: user.profileImage,
        });
    } catch (error) {
        console.log("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const logout = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
        };

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log("Logout error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "Refresh token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        generateAccessToken(decoded.userId, res);

        const user = await User.findById(decoded.userId).select("-password");

        return res.status(200).json({ user });
    } catch (error) {
        console.log("Refresh token error:", error.message);
        return res.status(403).json({
            message: "Invalid or expired refresh token",
        });
    }
};



export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("CheckAuth error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};