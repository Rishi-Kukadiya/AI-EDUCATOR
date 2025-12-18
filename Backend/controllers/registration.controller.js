import Student from "../models/student.model.js";
const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      city,
      std,
      school,
      gender,
      board,
      email,
      password,
      phone,
    } = req.body;
    if (
      !fullName ||
      !city ||
      !std ||
      !school ||
      !gender ||
      !board ||
      !email ||
      !password ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Phone Number!!",
      });
    }

    const allowedGenders = ["Male", "Female", "Other"];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender selected",
      });
    }

    const allowedBoards = ["GSEB", "CBSE", "ICSE", "Other"];
    if (!allowedBoards.includes(board)) {
      return res.status(400).json({
        success: false,
        message: "Invalid board selected",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (std < 6 || std > 8) {
      return res.status(400).json({
        success: false,
        message: "Invalid Standerds",
      });
    }

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const student = await Student.create(req.body);
    const Studentdata = await Student.findById(student._id).select(
      "-password -accessToken -refreshToken"
    );
    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      Studentdata,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export { registerStudent };
