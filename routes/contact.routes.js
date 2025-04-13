import { Router } from "express";
import { CreateContactMessage } from "../controller/contact.controller.js";

const router = Router();

router.post('/contact/create' , CreateContactMessage);
export default router;