import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const requireSignIn = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  //   console.log(token);
  if (!token) return res.status(401).json({ message: "Unauthorised!" });
  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
    console.error(error);
  }
};
