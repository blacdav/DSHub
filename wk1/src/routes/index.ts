import { Router } from "express";
import AuthRoutes from "./auth.route"

const router = Router();

router.get("/auth", AuthRoutes);
router.get("/feed", );
router.get("/monitor", );

export default router;