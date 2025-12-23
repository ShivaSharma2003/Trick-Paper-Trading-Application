import PositionModel from "@models/positionModel";
import { positionMap } from "@services/position.service";

export const fetchPositions = (req, res) => {
  try {
    const positions = positionMap.get(`${req.user.id}`);
    console.log(positions)
    if (!positions) return res.status(404).json({ message: "Position not found" });

    return res.status(200).json({ positions });
  } catch (error) {
    console.log(error)
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
