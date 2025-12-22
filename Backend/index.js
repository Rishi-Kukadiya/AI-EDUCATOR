import { app } from "./app.js";
import studentRoute from "./routes/student.routes.js";
import connectDB from "./db/connection.js";
import adminRoute from "./routes/admin.routes.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });

    app.use("/api/v1/student", studentRoute);
    app.use("/api/v1/admin", adminRoute);
  } catch (error) {
    console.log(error);
  }
};

startServer();
