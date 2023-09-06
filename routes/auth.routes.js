import express from "express";

import { Signup } from "../controllers/userController/signup.js";
import { SignIn } from "../controllers/userController/signin.js";
import { requireSignIn } from "../middlewares/authmiddleware.js";
import { Getme } from "../controllers/userController/getme.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);
router.get("/me", requireSignIn, Getme);

export default router;
