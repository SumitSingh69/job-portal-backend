import express from "express";
import { verifyAccessToken } from "../middleware/auth.middleware";
import { getApplicationByJobId } from "../controller/applications.controller";
const router = express.Router();

router.post("/application/get/:id", verifyAccessToken, getApplicationByJobId);


export default router;
