import express from "express";
import recuContraController from "../controllers/recuContra.js";

const router = express.Router();

// Ruta para solicitar el código de recuperación
router.post("/requestcode", recuContraController.requestCode);

// Ruta para verificar el código
router.post("/verifycode", recuContraController.verifyCode);

// Ruta para actualizar la contraseña
router.post("/updatepassword", recuContraController.updatepassword);

export default router;