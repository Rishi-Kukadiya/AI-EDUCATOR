import { Router } from "express";
import { registerStudent } from "../controllers/registration.controller.js";
import LoginStudent from "../controllers/Login.controller.js";
import Dashboard from "../controllers/Dashboard.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
const studentRoute = Router();

studentRoute.route("/register").post(registerStudent);
studentRoute.route("/login").post(LoginStudent);
studentRoute.route("/authenticate").get(verifyJWT, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
  });
});
studentRoute.route("/dashboard").get(verifyJWT, Dashboard);
export default studentRoute;
