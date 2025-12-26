import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import UserRoutes from "./routes/user.route.js";

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/users", UserRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));