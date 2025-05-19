import peliculasController from "../controllers/peliculasController.js";
import express from "express";
import multer from "multer";


const router = express.Router();

const upload = multer({dest: "public/"})


router
.route("/")
.get(peliculasController.getPeliculas)
.post(upload.single("imagen"),peliculasController.insertPeliculas)

router
.route("/:id")
.delete(peliculasController.deletePeliculas)
.put(upload.single("imagen"),peliculasController.upadatePeliculas) 


export default router;
