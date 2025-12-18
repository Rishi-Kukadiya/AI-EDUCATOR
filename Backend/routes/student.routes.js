import { Router } from "express";
import { registerStudent } from "../controllers/registration.controller.js";
const studentRoute = Router();


studentRoute.route("/register").post(registerStudent);
export default studentRoute;