import peliculasModel from "../models/peliculas.js";
import { config } from "../config.js";
import express from "express";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
  });

const peliculasController = {};

//el obtener peliculas
peliculasController.getPeliculas = async (req, res)=>{ 
    try {
        const peliculas = await peliculasModel.find();
    res.json(peliculas);
    } catch (error) {
        console.error("Error al obtener películas:", error);
        res.status(500).json({ message: "Error al obtener películas", error });
    } 
    
};


// insertar peliculas
peliculasController.insertPeliculas = async (req, res) => {
    try {
        console.log(req.body); // Verifica el contenido del cuerpo de la solicitud
        const { titulo, descripcion, director, genero, anio, duracion } = req.body;
        let imageURL = "";

        // SUBIR IMAGEN A CLOUDINARY
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"],
            });
            imageURL = result.secure_url;
        }

        const newPelicula = new peliculasModel({
            titulo,
            descripcion,
            director,
            genero,
            anio,
            duracion,
            imagen: imageURL,
        });

        await newPelicula.save();
        res.json({ message: "Película insertada correctamente" });
    } catch (error) {
        console.error("Error al insertar película:", error);
        res.status(500).json({ message: "Error al insertar película", error });
    }
};

    peliculasController.deletePeliculas = async (req, res) => {
        try {
            const deletePelicula = await peliculasModel.findByIdAndDelete(req.params.id);
            if (!deletePelicula) { // Cambié de "deletedBrand" a "deletePelicula"
                return res.status(404).json({ message: "Película no encontrada" });
            }
            res.json({ message: "Película eliminada correctamente" });
        } catch (error) {
            console.error("Error al eliminar película:", error);
            res.status(500).json({ message: "Error al eliminar película", error });
        }
    };
peliculasController.upadatePeliculas = async (req, res) =>{

    try {
        const {titulo, descripcion, director, genero, anio, duracion} = req.body;
        let imageURL = "";
        // SUBIR IMAGEN A CLOUDINARY
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"],
            });
            imageURL = result.secure_url;

            //actualizarlizamooooosss

            await peliculasModel.findByIdAndUpdate(req.params.id, {

                titulo,
                descripcion,
                director,
                genero,
                anio,
                duracion,
                imagen: imageURL,
            }, {new: true});
            res.json({message: "Película actualizada correctamente"});
            
        }
        
    } catch (error) {
        res.status(500).json({message: "Error al actualizar película", error});
        console.error("Error al actualizar película:", error);
    }
}


export default peliculasController;
