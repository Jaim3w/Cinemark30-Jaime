import { Schema, model } from "mongoose";

const clienteSchema = new Schema({

  nombre: {
    type: String,
    required: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
  },

  correo: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Por favor, ingrese un correo electrónico válido",
    ],
  },

  contrasenia: {
    type: String,
    required: true,
    minlength: [5, "La contraseña debe contar mínimo con 5 caracteres."]
  },

  telefono: {
    type: String,
    required: true,
    match: [
      /^[0-9]{8}$/,
      "El teléfono debe contener exactamente 8 dígitos numéricos",
    ],
  },

  direccion: {
    type: String,
    required: true,
  },

  dui: {
    type: String,
    match: [
      /^[0-9]{8}-[0-9]{1}$/,
      "El DUI debe contener exactamente 8 dígitos numéricos seguido de un guion y un dígito",
    ],
  }

}, {
  timestamps: true,
  strict: false,
});

export default model("clientes", clienteSchema);
