import { Router } from "express";
import { createCompany, getCompanyById, getAllCompanies, updateCompany, deleteCompany } from "../controller/companies.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { isAnyRecruiterOrAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.post("/company/create", verifyAccessToken, isAnyRecruiterOrAdmin, createCompany);
router.get("/company/:id", verifyAccessToken, isAnyRecruiterOrAdmin, getCompanyById);
router.get("/companies", verifyAccessToken, isAnyRecruiterOrAdmin, getAllCompanies);

router.put("/company/:id", verifyAccessToken, isAnyRecruiterOrAdmin, updateCompany);
router.post("/company/:id/delete", verifyAccessToken, isAnyRecruiterOrAdmin, deleteCompany);

export default router;
