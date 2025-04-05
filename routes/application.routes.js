import express from "express";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { getApplicationByJobId } from "../controller/applications.controller.js";
const router = express.Router();

router.get("/application/get/:id", verifyAccessToken, getApplicationByJobId);


export default router;
