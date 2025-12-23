import { fetchPositionStatement, fetchPositions } from "@controllers/Position.controller";
import authenticate from "@middleware/authenticate";
import express from "express";

const router = express.Router();

router.get("/" , authenticate , fetchPositions)
router.get("/statement" , authenticate , fetchPositionStatement)
export default router;
