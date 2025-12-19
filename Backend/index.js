import { app } from "./app.js";
import studentRoute from "./routes/student.routes.js";
import connectDB from "./db/connection.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });

    app.use("/api/v1/student", studentRoute);
  } catch (error) {
    console.log(error);
  }
};

startServer();
