import { Router } from "express";
import { createJobSeeker, getJobSeekerById, getJobSeekerByUserId } from "../controller/job-seeker.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { isJobseeker } from "../middleware/role.middleware.js";

const router = Router();    

router.post('/job-seeker/create' , verifyAccessToken , isJobseeker , createJobSeeker);
router.get('/job-seeker/me' , verifyAccessToken , isJobseeker , getJobSeekerByUserId);

export default router;