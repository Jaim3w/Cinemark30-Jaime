import express from "express"
import empleadosController from "../controllers/empleadosController.js"

const router = express.Router();


router
.route("/")
.get(empleadosController.getEmpleados)

router
.route("/:id")
.put(empleadosController.putEmpleados)
.delete(empleadosController.DeleteEmpleado)

export default router;
