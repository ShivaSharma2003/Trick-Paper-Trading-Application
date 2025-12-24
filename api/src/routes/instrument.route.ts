import {
  fetchInstrumentById,
  fetchInstruments,
} from "@controllers/instrument.controller";
import { Router } from "express";

const router = Router();

router.get("/", fetchInstruments);
router.get("/:tokenId", fetchInstrumentById);

export default router;
