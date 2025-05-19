import empleadosModel from "../models/empleados.js";
import { config } from "../config.js";
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"; // Token
import express from "express";


const registrarEmpleadosController = {}

registrarEmpleadosController.postEmpleados = async (req, res) =>{

const {
    nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui,
}= req.body

try {
const empleadoExiste = await empleadosModel.findOne({correo})
if(empleadoExiste){
    return res.json({ message: "el empleado ya existe" });
}
   // Validación extra: formato de teléfono y DUI
   if (!/^\d{8}$/.test(telefono)) {
    return res
      .status(400)
      .json({ message: "El telefono debe de tener 8 digitos" });
  }

  if (!/^\d{8}-\d$/.test(dui)) {
    return res
      .status(400)
      .json({ message: "el fromato del dui debe de se el siguinte: XXXXXXXX-X." });
  }

const contraseniaEncriptada = await bcryptjs.hash(contrasenia, 10);

const newEmployee = empleadosModel({
    nombre,
    correo,
    contrasenia:contraseniaEncriptada,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui,
});

await newEmployee.save();

jsonwebtoken.sign(
    //1- Que voy a guardar
    { id: newEmployee._id },
    //2- secreto
    config.JWT.secret,
    //3- Cuando expira
    { expiresIn: config.JWT.expires },
    //4- funcion flecha
    (error, token) => {
      if (error) console.log("error");

      res.cookie("authToken", token);
      res.json({ message: "Employee registrado" });
    }
  );
  
} catch (error) {
  console.log("error" + error);
  res.json({ message: "Error" });
}
}

export default registrarEmpleadosController;
