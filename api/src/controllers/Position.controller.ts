import { redis } from "@config/redis.config";
import PositionModel from "@models/positionModel";

export const fetchPositions = async (req, res) => {
  try {
    const userId = req.user.id;

    const redisKey = `trick:positions:${userId}`;
    const data = await redis.hGetAll(redisKey);

    if (!data || Object.keys(data).length === 0) {
      return res.status(200).json({ positions: [] });
    }

    const positionsArray = Object.values(data)
      .filter((item): item is string => typeof item === "string")
      .map((item) => JSON.parse(item));
    return res.status(200).json({ positions: positionsArray });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchPositionStatement = async (req, res) => {
  try {
    const positions = await PositionModel.find({ userId: req.user.id });
    if (!positions)
      return res.status(404).json({ message: "Positions not found" });

    return res.status(200).json({ positions });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
