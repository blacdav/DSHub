import { Router } from "express";
import { CheckAuthUser } from "../middleware/auth.middleware";
import { AddFeed } from "../controllers/feed/add.feed";

const router = Router();

router.post('/', CheckAuthUser, AddFeed)

export default router;