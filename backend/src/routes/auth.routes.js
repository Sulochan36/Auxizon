import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    login,
    logout,
    refreshAccessToken,
    checkAuth,
    providerSignup,
    signupCustomer,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup/register-customer", signupCustomer);
router.post("/signup/register-provider", providerSignup);
router.post("/login", login);

router.post("/logout", protectRoute, logout);

router.post("/refresh-token", refreshAccessToken);

router.get("/check", protectRoute, checkAuth);

export default router;