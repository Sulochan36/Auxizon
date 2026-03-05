import jwt from "jsonwebtoken";


export const generateAccessToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "5m", // 1 minutes
    });

    res.cookie("accessToken", token, {
        maxAge: 5 * 60 * 1000, // 15 minutes
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return token;
};


export const generateRefreshToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d", // 7 days
    });

    res.cookie("refreshToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return token;
};