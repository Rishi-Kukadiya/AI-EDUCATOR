import connection from "./app.js";
import { app } from "./app.js";
import studentRoute from "./routes/student.routes.js";

connection();
app.use("/api/v1/student" , studentRoute);
