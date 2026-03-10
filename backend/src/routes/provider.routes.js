import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { getProviderDetails, getProviderProfile, getProviders, updateProviderProfile } from "../controllers/provider.controller.js";


const router = express.Router();


router.get('/profile', protectRoute, requireRole('provider'), getProviderProfile);
router.put('/profile', protectRoute, requireRole('provider'), updateProviderProfile);

router.get('/', getProviders);
router.get('/:id', getProviderDetails);


// router.patch('/availability', protectRoute, requireRole('provider'), toggleProviderStatus);
// router.get('/category-request', protectRoute, requireRole('provider'), getCategoryRequest);
// router.post('/category-request', protectRoute, requireRole('provider'), applyCategoryRequest);





export default router;