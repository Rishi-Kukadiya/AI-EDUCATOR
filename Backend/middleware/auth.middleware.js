import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message : "Unauthorized access!!",
        })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Student.findById(decoded._id).select("-password -refreshToken");
    if (!user) {
        return res.status(401).json({
            success: false,
            message : "Unauthorized access!!",
        });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
        success: false,
        message : "Unauthorized access!!",
    });
  }
};

export default verifyJWT;