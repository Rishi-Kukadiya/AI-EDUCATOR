import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    chapters: {
      type: [String],
      required: true,
    },

    language: {
      type: String,
      enum: ["English", "Gujarati"],
      required: true,
    },

    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],

    totalMarks: {
        type: Number,
        required: true,
    },

    obtainedMarks: {
        type: Number,
        default: 0,
    },
    
    aiTestSuggestion: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
