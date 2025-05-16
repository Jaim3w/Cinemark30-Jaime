  /* 
  
empleados:

nombre
correo
contrasenia
telefono 
direccion
puesto 
fecha_contratacion
salario
DUI
  */

import { Schema, model } from "mongoose";


const empleadosSchema = new Schema(
{

nombre:{
  type: String,
  required: true,
  minlength:[4  ,"El nombre debe tener al menos 3 caracteres"],
},
correo:{
  type: String,
  required: true,
  unique: true,
  trim:true,
  match: [
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    "Por favor, ingrese un correo electrónico válido",
  ],
},
contrasenia:{
type:String,
required: true,
minlength: [5, "la contraseña debe contar minimo con 5 caracteres."],


},
telefono:{
  type:String,
  required: true,
  match: [
    /^[0-9]{8}$/,
    "El teléfono debe contener exactamente 8 dígitos numéricos",
  ],
},
direccion:{
  type:String,
  required: true,
},
puesto:{
  type:String,
  required: true,

},
fecha_contratacion:{
  type:String,
  required: true,
  max: [new Date(), "La fecha de nacimiento no puede ser una fecha futura"],
  message: "La fecha de contratación no puede ser una fecha futura",
},
salario:{
  type:Number,
  required: true,
},
dui:{
  type: String,
  required: true,
  unique: true,
  match: [/^\d{8}-\d$/, "el formato del dui debe de ser el siguiente XXXXXXXX-X."],

},
},
{
  timestamps:true,
  strict:false
  
  }
);

export default model("empleados",empleadosSchema )

