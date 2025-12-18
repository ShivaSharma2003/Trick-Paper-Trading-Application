import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization.startsWith(`Bearer `);
    const token = req.headers.authorization.split(" ")[1];
    if (!authorization && !token)
      return res.status(403).json({ message: "Bad Request. Invalid Header" });
    console.log(req.headers.authorization)
    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified)
      return res.status(403).json({ message: "Bad Request. Invald Header" });

    req.user = verified;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authenticate;
