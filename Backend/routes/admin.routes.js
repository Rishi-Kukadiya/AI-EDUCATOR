import { Router } from "express";
import Pdfuploader from "../controllers/Pdfupload.controller.js";
import uploadPdf from "../middleware/multer.middleware.js";
const adminRoute = Router();

adminRoute.route("/upload").post(
 uploadPdf.single("chapterPdf"),
 Pdfuploader
)
export default adminRoute;