import express from "express";
import { checkPasswordStrength } from "../passwordCheckController/passwordController.js";

const router = express.Router();

router.post("/password-strength", checkPasswordStrength);

export default router;
