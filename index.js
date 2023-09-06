import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import communityRoutes from "./routes/community.routes.js";
import roleRoutes from "./routes/role.routes.js";
import memberRoutes from "./routes/member.routes.js";

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

//route
app.use("/v1/auth", authRoutes);
app.use("/v1", communityRoutes);
app.use("/v1", roleRoutes);
app.use("/v1", memberRoutes);
//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
