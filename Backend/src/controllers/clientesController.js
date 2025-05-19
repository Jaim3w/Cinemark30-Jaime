import clientesModel from "../models/clientes.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";



const  clientesController = {};

// Obtener todos los clientes

clientesController.getClientes = async (req, res) => {

    try {
        const clientes = await clientesModel.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: "algo salio mal error", error: error.message })
        
    }
};

// registrar cliente
clientesController.postClientes = async (req, res) => {
const {nombre, correo, contrasenia, telefono, direccion, dui} = req.body;

try {
    const existeCliente = await clientesModel.findOne({correo});    
    if (existeCliente) {
        return res.status(409).json({ message: "El correo ya está registrado" });
    };

    const contraHash = await bcrypt.hash(contrasenia, 10);

    const nuevoCLiente =new clientesModel({
        nombre, 
        correo, 
        contrasenia:contraHash,
        telefono,
        direccion,
        dui: dui || null,
    });
    await nuevoCLiente.save();

    res.json ({message: "cliente registrado con exito"})
}
catch (error) {
    res.status(500).json({ message: "Error al registrar cliente", error });
}
};

//actualizar cliente
clientesController.updateClientes = async (req, res) =>{
const {nombre, correo, contrasenia, telefono, direccion, dui} = req.body;
 if (!nombre || !correo || !contrasenia || !telefono || !direccion ) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" } )
 };
try {
const updateCliente = await clientesModel.findByIdAndUpdate(
    req.params.id,
    {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        dui: dui || null,
    },
    { new: true }
);

if (!updateCliente) {
    return res.status(404).json({ message: "Client not found" });
  }
  res.json({ message: "Cliente actualizado correctamente"});

    
} catch (error) {
    res.status(500).json ({message: "error al actualizar cliente", error});
}
};


// eliminar cliente

clientesController.deleteClientes = async (req, res) => {

    try {
        const deleteClientes = await clientesModel.findByIdAndDelete(req.params.id);
        if (!deleteClientes) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json({ message: "Cliente eliminado correctamente" });
        
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar cliente", error });
    }
};

export default clientesController;
