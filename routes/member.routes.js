import express from "express";
import { requireSignIn } from "../middlewares/authmiddleware.js";
import { CreateMember } from "../controllers/memberController/createMember.js";
import { deleteMember } from "../controllers/memberController/deleteMember.js";

const router = express.Router();

router.post("/member", requireSignIn, CreateMember);
router.delete("/member/:id", requireSignIn, deleteMember);

export default router;
