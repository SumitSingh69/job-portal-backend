import { Router } from "express";
import { checkCompletionStatus, createJobSeeker, getJobSeekerById, getJobSeekerByUserId } from "../controller/job-seeker.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { isJobseeker } from "../middleware/role.middleware.js";

const router = Router();    

router.post('/job-seeker/create' , verifyAccessToken , isJobseeker , createJobSeeker);
router.get('/job-seeker/me' , verifyAccessToken , isJobseeker , getJobSeekerByUserId);
router.get('/job-seeker/check-status' , verifyAccessToken , isJobseeker , checkCompletionStatus);

export default router;