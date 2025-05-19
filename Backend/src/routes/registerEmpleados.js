import express from "express";
import registrarEmpleadosController from "../controllers/empleadosRegisterController.js";

const router = express.Router();

router.route("/").post(registrarEmpleadosController.postEmpleados);

export default router;
//cambios en env.w d aaw dd