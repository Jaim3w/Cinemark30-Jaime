import clientesController from "../controllers/clientesController.js";
import express from "express";

const router = express.Router();

router
.route("/")
.get(clientesController.getClientes)
.post (clientesController.postClientes)

router.route("/:id")
.put(clientesController.updateClientes)
.delete(clientesController.deleteClientes)

export default router;