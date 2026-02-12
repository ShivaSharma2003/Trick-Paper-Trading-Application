import adminModel from "@models/adminModel";
import brokerModel from "@models/brokerModel";
import OrderModel from "@models/orderModel";
import userModel from "@models/userModel";
import generateToken from "@util/generateToken";

export const loginAdminUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password)
      return res.status(401).json({ message: "userId or password invalid" });

    const admin = await adminModel.findOne({ userId });
    if (!admin)
      return res.status(401).json({ message: "userId or password invalid" });

    const verified = await admin.comparePassword(password);
    if (!verified)
      return res.status(401).json({ message: "userId or password invalid" });
    console.log(admin._id);
    const token = await generateToken({ id: admin._id, role: admin.role });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: "Bad Request" });
  }
};

export const registerClientByAdmin = async (req, res) => {
  try {
    const {
      userName,
      password,
      userId,
      isDemoId,
      availableFunds,
      futMargin,
      optMargin,
    } = req.body;
    const isAdmin = await adminModel.findOne({ _id: req.user.id });

    if (!isAdmin) {
      return res.status(401).json({ message: "UnAuthorized request" });
    }

    const client = await userModel.create({
      userId,
      userName,
      password,
      availableFunds,
      futMargin,
      optMargin,
      brokerId: isAdmin._id,
      isDemoId,
    });

    return res
      .status(200)
      .json({ message: "User Created Successfully", client });
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Client Created Failed" });
  }
};

export const registerBrokerByAdmin = async (req, res) => {
  try {
    const { userId, userName, password } = req.body;

    const isAdmin = await adminModel.findOne({ _id: req.user.id });

    if (!isAdmin)
      return res.status(401).json({ message: "UnAuthorized Access" });

    const broker = await brokerModel.create({
      userId,
      userName,
      password,
    });

    return res
      .status(200)
      .json({ message: "Broker Created Successfully", broker });
  } catch (error) {
    return res.status(401).json({ message: "Broker Created Failed" });
  }
};

export const fetchAllClients = async (req, res) => {
  try {
    const isAdmin = await adminModel.findOne({ _id: req.user.id });
    if (!isAdmin)
      return res.status(401).json({ message: "UnAuthorized Request" });
    const clients = await userModel.find().select("-password");
    return res.status(200).json({ clients });
  } catch (error) {
    return res.status(401).json({ message: "Bad Request" });
  }
};

export const fetchClientById = async (req, res) => {
  try {
    const { clientId } = req.params;
    const isAdmin = await adminModel.findOne({ _id: req.user.id });
    if (!isAdmin)
      return res.status(401).json({ message: "UnAuthorized Request" });
    const client = await userModel.findById(clientId);
    return res.status(200).json({ client });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchAllBrokers = async (req, res) => {
  try {
    const isAdmin = await adminModel.findOne({ _id: req.user.id });
    if (!isAdmin)
      return res.status(401).json({ message: "UnAuthorized Access" });
    const brokers = await brokerModel.find().select("-password");
    return res.status(200).json({ brokers });
  } catch (error) {
    return res.status(401).json({ message: "Bad request" });
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate(
      "userId",
      "userName userId ",
    );
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.user.id);
    if (!admin) return res.status(403).json({ message: "UnAuthorized Access" });

    const { clientId } = req.params;
    const client = await userModel.findById(clientId);
    if (!client)
      return res.status(404).json({ message: "Client Not Found!!!" });
    await userModel.findByIdAndDelete(clientId);
    return res.status(200).json({ message: "Client Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletebroker = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.user.id);
    if (!admin) return res.status(403).json({ message: "UnAuthorized Access" });
    const { brokerId } = req.params;
    const broker = await brokerModel.findById(brokerId);
    if (!broker) return res.status(404).json({ mesage: "Broker Not found!!!" });
    await brokerModel.findByIdAndDelete(brokerId);
    return res.status(200).json({ message: "Broker Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const blockClientAccount = async (req, res) => {
  try {
    const { clientId } = req.params;
    const admin = await adminModel.findById(req.user.id);
    if (!admin) return res.status(401).json({ message: "unAuthorized Access" });
    await userModel.findByIdAndUpdate(clientId, {
      $set: { isAccountBlocked: true },
    });
    return res.status(200).json({ message: "Client Block Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const unblockClientAccount = async (req, res) => {
  try {
    const { clientId } = req.params;
    const admin = await adminModel.findById(req.user.id);
    if (!admin) return res.status(401).json({ message: "unAuthorized Access" });
    await userModel.findByIdAndUpdate(clientId, {
      $set: { isAccountBlocked: false },
    });
    return res.status(200).json({ message: "Client Block Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addFundsToClientAccount = async (req, res) => {
  try {
    const { funds } = req.body;
    const { clientId } = req.params;

    if (!Number.isFinite(funds) || funds <= 0) {
      return res.status(400).json({ message: "Invalid fund amount" });
    }

    const admin = await adminModel.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const client = await userModel.findByIdAndUpdate(
      clientId,
      {
        $inc: { availableFunds: funds },
      },
      { new: true },
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json({
      message: "Funds added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
