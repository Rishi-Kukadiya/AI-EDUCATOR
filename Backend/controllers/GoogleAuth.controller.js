import Student from "../models/student.model.js";
import { generateAccessAndRefreshTokens } from "./Login.controller.js";

const GoogleAuth = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Please Register on our portal!!",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user?._id
    );
    const loggedInUser = await Student.findById(user._id).select(
      "-password -refreshToken"
    );

    const isProd = process.env.NODE_ENV === "production";
    const options = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Student Login successfully",
        loggedInUser,
        accessToken,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
export default GoogleAuth;
