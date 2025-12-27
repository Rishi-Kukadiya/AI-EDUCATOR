// models/studentAttempt.model.js
import mongoose from "mongoose";
const studentAttemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    studentAnswerText: {
      type: String,
      required: true,
    },

    studentAnswerMedia: {
      type: String, 
      default: null,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    marksObtained: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudentAttempt", studentAttemptSchema);
