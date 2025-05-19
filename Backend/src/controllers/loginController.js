import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"; // Token
import empleadosModel from "../models/empleados.js";
import clientesmodels from "../models/clientes.js";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
const { correo, contrasenia } = req.body;
try {
    let userFund;
    let userType;

    if(correo === config.admin.email && contrasenia === config.admin.password){
        userType = "admin";
        userFund = {_id: "admin"}
    }
    else{

        userFund = await empleadosModel.findOne({ correo });
        userType = "empleado";
    }
    if (!userFund) {
        userFund = await clientesmodels.findOne({ correo });
        userType = "cliente";

    }
    if (!userFund) {
        return res.status(401).json({ message: "usuario no encontrado" });
    }

    if (userType !== "admin") {
        if (!userFund.contrasenia) {
          return res.status(500).json({ message: "El usuario no tiene una contraseña registrada" });
        }
        const isMatch = await bcryptjs.compare(contrasenia, userFund.contrasenia);
        if (!isMatch) {
            return res.status(401).json({ message: "contraseña incorrecta" });
        }
    }
    


    jsonwebtoken.sign(
        {id:userFund._id, userType},
        config.JWT.secret,
        {expiresIn: config.JWT.expires},
        (error, token) => {
            if (error) {
                console.log("error" + error);            }
            res.cookie("authToken", token)
            res.json({ message: "login exitoso"})
        }
    );

} catch (error) {
    res.status(500).json({ message: "error al iniciar sesion", error: error.message });
}
}
export default loginController;