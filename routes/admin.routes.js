import express from "express";
import {
  Adminlogin,
  createAdmin,
  deleteAdmin,
  refreshAccessToken,
  updateAdmin,
  logoutAdmin,
} from "../controller/adminController.js";
import { isAdmin } from "../middleware/role.middleware.js";
import { verifyAdminAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/admin/login", Adminlogin);
router.post("/admin/create", createAdmin);
router.post("/admin/update", isAdmin, updateAdmin);
router.post("/admin/delete", isAdmin, deleteAdmin);
router.post("/admin/refresh-token", refreshAccessToken);
router.post("/admin/logout", verifyAdminAccessToken, logoutAdmin);

export default router;
