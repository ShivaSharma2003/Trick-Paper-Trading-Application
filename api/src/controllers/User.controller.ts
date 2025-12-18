import userModel from "@models/userModel";
import generateToken from "@util/generateToken";

export const registerUserAccount = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const exist = await userModel.findOne({ userId });
    if (exist)
      return res.status(403).json({ message: "UserId Already Exists" });

    if (!userId && !password)
      return res.status(403).json({ message: "Bad Request. Body not found" });

    const user = await userModel.create({
      userId,
      password,
    });

    if (!user) return res.status(403).json({ message: "Bad Request" });
    const token = await generateToken({
      id: String(user._id),
      role: user.role,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) return res.status(401).json({ message: "unAuthorized Access" });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
