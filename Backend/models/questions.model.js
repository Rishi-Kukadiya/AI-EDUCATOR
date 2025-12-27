// models/question.model.js
import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    type: {
      type: String,
      enum: ["MCQ", "TEXT", "IMAGE", "AUDIO"],
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    options: {
      type: [String], 
      default: [],
    },

    correctAnswer: {
      type: String,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    suggestion: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
