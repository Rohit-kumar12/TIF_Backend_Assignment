import express from "express";
import { createRole } from "../controllers/RoleController/createRole.js";
import { getRoll } from "../controllers/RoleController/getRole.js";
import { requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();

//routes
router.post("/role", requireSignIn, createRole);
router.get("/role", requireSignIn, getRoll);

export default router;
