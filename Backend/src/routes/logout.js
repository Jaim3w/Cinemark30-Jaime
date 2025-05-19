import logoutController from "../controllers/logoutController.js";
import express from "express";
const router = express.Router();

router.route("/").post(logoutController.logout);


export default router;
