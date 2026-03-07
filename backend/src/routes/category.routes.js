import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { getAllCategories, getCategoryDetail, getProvidersByCategory } from "../controllers/category.controller.js";


const router = express.Router();

router.get('/',getAllCategories);
router.get("/providers", getProvidersByCategory);
router.get('/:id', getCategoryDetail);



export default router;