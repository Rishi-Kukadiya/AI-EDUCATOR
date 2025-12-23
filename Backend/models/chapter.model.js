import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    standard: { type: Number, required: true },
    subject: { type: String, required: true },
    chapterName: { type: String, required: true },
    board : {type : String , required : true}, 
    pdfUrl: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", chapterSchema);
