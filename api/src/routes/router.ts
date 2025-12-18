import express from "express";
import InstrumentRoutes from "./instrument.route";
import UserRoutes from './user.route'
const router = express.Router();

// You can require and use your routes here ;)
router.use("/instrument", InstrumentRoutes);
router.use("/user", UserRoutes);

export default router;
