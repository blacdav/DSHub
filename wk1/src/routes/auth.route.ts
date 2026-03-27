import { Router } from "express";
import { SignUp } from "../controllers/auth/signup.controller";
import { SignIn } from "../controllers/auth/signin.controller";
import { SignOut } from "../controllers/auth/signout.controller";
import { VerifyOtp } from "../controllers/auth/verifyotp.controller";
import { ForgottenPassword } from "../controllers/auth/forgotten-password.controller";
import { ResendOtp } from "../controllers/auth/resend-otp.controller";
import { ResetPassword } from "../controllers/auth/reset-password.controleer";
import { GetMe } from "../controllers/auth/me.controller";
import { CheckAuthUser } from "../middleware/auth.middleware";

const router = Router();

router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);
router.post('/sign-out', SignOut);
router.post('/verify-otp', VerifyOtp);
router.post('/forgotten-password', ForgottenPassword);
router.post('/resend-otp', ResendOtp);
router.post('/reset-password', ResetPassword);
router.get('/me', CheckAuthUser, GetMe);

export default router;