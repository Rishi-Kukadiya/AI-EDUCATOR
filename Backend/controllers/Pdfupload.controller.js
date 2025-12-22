import cloudinary from "../utils/cloudinary.js";
import Chapter from "../models/chapter.model.js";
import fs from "fs"; 

const Pdfuploader = async (req, res) => {
  try {
    const { standard, subject, chapterName } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "chapter_pdfs",
      resource_type: "raw",  
      format: "pdf"
    });


    fs.unlinkSync(req.file.path);

    const chapter = await Chapter.create({
      standard,
      subject,
      chapterName,
      pdfUrl: result.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "PDF uploaded to Cloudinary",
      pdfUrl: result.secure_url,
      chapter,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default Pdfuploader;

