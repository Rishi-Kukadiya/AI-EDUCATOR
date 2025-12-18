import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    std: {
      type: Number,
      required: true,
      enum: [6 , 7 , 8],
    },

    school: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    board: {
      type: String,
      enum: ["GSEB", "CBSE", "ICSE", "Other"],
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

studentSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next();
    console.log("changing password");
    this.password = await bcrypt.hash(this.password , 10);
    next;
})


studentSchema.method.isPasswordCorrect = async function (password){
    if(!password) return false ;
    return await bcrypt.compare(password , this.password);
}

studentSchema.methods.generateAccessToken = async function () {
    
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
studentSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const Student = mongoose.model("Student", studentSchema);
export default Student;
