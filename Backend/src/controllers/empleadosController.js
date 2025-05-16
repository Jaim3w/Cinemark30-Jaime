import empleadosModel from "../models/empleados.js";

const empleadosController = {}

// Obtener todos los empleados

empleadosController.getEmpleados = async (req, res) =>{
try {
    
const empleados = await empleadosModel.find();
res.json(empleados)

} catch (error) {
 res.status(500).json({message:"erro al obtener empleados", error})
}
};


//Actualizar Empleado

empleadosController.putEmpleados = async (req, res ) =>{
try {

const {nombre, correo,telefono, direccion, puesto,fecha_contratacion, salario, dui  } = req.body;

const actuEmpleados = await empleadosModel.findByIdAndUpdate(
req.params.id,
{
    nombre,
    correo,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    dui,
},
{ new: true } 
);
if (!actuEmpleados) {
    return res.status(404).json({ message: "empleado no encontrado." });
  }

  res.json({ message: "empleado actualizado satisfactoriamente" });

    
} catch (error) {
    res.status(500).json({message:"erro al actualizar empleados", error})
}
};



//eliminar empleado

empleadosController.DeleteEmpleado = async (req, res) =>{
    try {
        const borrarEmpleado = await empleadosModel.findByIdAndDelete(req.params.id);
        if (!borrarEmpleado) {
            return res.status(404).json({ message: "empleado no encontrado" });
          
        }

        res.json({message: "empleado eliminado correctamente"});

    } catch (error) {
        res.status(500).json({message:"error al eliminar empleado", error});
        
    }
};

export default empleadosController;



