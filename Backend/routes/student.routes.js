import { Router } from "express";
import { registerStudent } from "../controllers/registration.controller.js";
import LoginStudent from "../controllers/Login.controller.js";
const studentRoute = Router();


studentRoute.route("/register").post(registerStudent);
studentRoute.route("/login").post(LoginStudent);
export default studentRoute;