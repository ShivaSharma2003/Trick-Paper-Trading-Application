import {
  fetchUserProfile,
  registerUserAccount,
} from "@controllers/User.controller";
import { Router } from "express";
import authenticate from "@middleware/authenticate";

const router = Router();

router.post("/auth/register", registerUserAccount);
router.get("/", authenticate, fetchUserProfile);

export default router;
