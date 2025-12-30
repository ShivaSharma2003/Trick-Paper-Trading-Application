// Register module/require aliases
import "module-alias/register";

// Patches
import { inject, errorHandler } from "express-custom-error";
inject(); // Patch express in order to use async / await syntax

// Require Dependencies
import env from "mandatoryenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import logger from "@util/logger";

// Load .env Enviroment Variables to process.env

env.load([
  "DB_URL",
  "PORT",
  "SECRET",
  "INSTRUMENTS_URL",
  "REDIS_URL",
  "SMART_API_KEY",
  "SMART_API_CLIENT_ID",
  "SAMRT_API_CLIENT_TOPTP",
  "SMART_API_CLIENT_PASSWORD",
]);

// Instantiate an Express Application

const app = express();

// Web Socket initialising
const http = require("http");
import { Socket } from "@config/socket.config";
const server = http.createServer(app);
Socket(server);

// Database Connection
import connectDB from "@config/database.config";
connectDB();

// Redis Connection
import { redisConnect } from "@config/redis.config";
redisConnect();

// Configure Express App Instance
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Assign Routes
import router from "./routes/router";
app.use("/api/v1", router);

// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on configurated Port

server.listen(process.env.PORT, () =>
  console.info("Server listening on port ", process.env.PORT)
);

import { storeInstrument } from "@helpers/instrument";
// storeInstrument(); 

// Scheduler for fetching instruments every morning @08:30 AM
import { fetchInstrumentScheduler } from "@helpers/scheduler";
fetchInstrumentScheduler();

// SmartApi Connection
import TickEngine from "@services/ticks.service";
TickEngine();

// For testing only
