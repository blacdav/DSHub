import { Router } from "express";
import AuthRoutes from "./auth.route"
import FeedRoutes from "./feed.route"

const router = Router();

router.get("/auth", AuthRoutes);
router.get("/feed", FeedRoutes);
// router.get("/monitor", );

export default router;