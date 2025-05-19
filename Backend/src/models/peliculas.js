  /* 
  
tabla peliculas:
titulo
descripcion
director
genero
anio
duracion
imagen
  */

import { Schema, model } from "mongoose";

const peliculasSchema = new Schema(
{ 
  titulo:{
    type: String,
    required: true,
    minlength: [1, "El título debe tener al menos 1 caracter"],
  },
  descripcion:{
    type:String,
    required: true,
    trim: true,
    minlength: [6, "La descripción debe tener al menos 6 caracteres"],
  },
  director:{
    type:String,
    required:true,
    minlength: [3, "El nombre del director debe tener al menos 3 caracteres"],
  },
  genero:{ 
    type: [String],
    required: true,
    minlength: [3, "El género debe tener al menos 3 caracteres"],
  },
  anio:{
    type:Number,
    required:true,
  },
  duracion:{
type: Number,
required: true,
minlength: [1, "La duración debe tener al menos 1 caracter y la duracion debe de estar en minutos"],

  },
  imagen:{
    type:String,
    required: true,
   }
},
{
  timestamps: true,
  strict:false,
}

)

export default model("peliculas", peliculasSchema);
//env...