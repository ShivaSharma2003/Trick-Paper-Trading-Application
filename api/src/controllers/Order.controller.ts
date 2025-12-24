import { OrderCreateEngine } from "@services/order.service";
import OrderModel from "@models/orderModel";
import { endOfDay, startOfDay } from "@util/date";
import { initExecution } from "@services/execute.service";
import expressAsyncHandler from "express-async-handler";

export const createOrder = async (req, res) => {
  try {
    const {
      token,
      orderType,
      transactionType,
      lotQuantity,
      tradeType,
      limit,
      triggerPrice,
    } = req.body;

    console.log(req.body);
    const order = await OrderCreateEngine({
      lotQuantity,
      orderType,
      token,
      tradeType,
      transactionType,
      limit,
      triggerPrice,
      userId: req.user.id,
    });
    if (!order)
      return res
        .status(403)
        .json({ message: "Bad Request. Order not created" });

    await initExecution(order);
    return res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      userId: req.user.id,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({
      createdAt: -1,
    });
    if (!orders) return res.status(404).json({ message: "Orders not found" });
    return res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchOrderBook = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId);
    if (!order && order.userId !== req.user.id)
      return res.status(403).json({ message: "Bad Request" });
    order.orderStatus = "CANCELLED";
    await order.save();

    res.status(200).json({ message: "Order Cancel" });
  } catch (error) {
    res.status(200).json({ message: "Internal Server Error" });
  }
};
