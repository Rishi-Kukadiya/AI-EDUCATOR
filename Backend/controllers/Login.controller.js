import Student from "../models/student.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Student.findById(userId);
    if (!user) {
      throw new Error("Internal Server Error!!");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const LoginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Student NotFound!!",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!!",
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

export default LoginStudent;
