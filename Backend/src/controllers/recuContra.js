import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import clientesMondel from "../models/clientes.js";
import empleadosModel from "../models/empleados.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/recuContraUtils.js";
import { config } from "../config.js";
import { verify } from "crypto";

const recuContraController = {};

recuContraController.requestCode = async(req, res) => {

    const {correo} = req.body;

    try {
        let userFund;
        let userType;

        userFund = await clientesMondel.findOne({ correo });    
        if (userFund) {
            userType = "cliente";
        }else{
            userFund = await empleadosModel.findOne({ correo });
            userType = "empleado";
        }
        if (!userFund) {
            return res.status(401).json({ message: "usuario no encontrado" });
        }
        
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const token = jsonwebtoken.sign(
            {correo, code, userType, verified: false},
            config.JWT.secret,
            {expiresIn: "20m"}
        );

         res.cookie("tokenRecoverytoken", token, {maxAge: 20 * 60 * 1000});

         await sendEmail(
            correo,
            "Password recovery code",
            `Your verification code is: ${code}`,
            HTMLRecoveryEmail(code)
         );

         res.json({ message: "codigo enviado a tu correo" });
        
    }
     catch (error) {
        res.status(500).json({ message: "error al enviar el correo", error: error.message });
    }
};

     recuContraController.verifyCode = async (req, res) => {
            const {code} = req.body;
             
            try {
                const token = req.cookies.tokenRecoverytoken;
                const decoded = jsonwebtoken.verify(token, config.JWT.secret);

                if(decoded.code !== code){
                    return res.status(401).json({ message: "codigo  invalido" });
                }

                const newToken = jsonwebtoken.sign(

                    {
                        correo: decoded.correo,
                        code: decoded.code,
                        userType: decoded.userType,
                        verified: true,
                    },
                    config.JWT.secret, 
                    {expiresIn: "20m"}

                );
                res.cookie("tokenRecoverytoken", newToken, {maxAge: 20 * 60 * 1000});

                res.json({ message: "codigo verificado" });

                console.log("JWT_SECRET:", config.JWT.secret, typeof config.JWT.secret);


                
            } catch (error) {
                res.status(500).json({ message: "error al verificar el codigo", error: error.message });
                console.log("JWT_SECRET:", config.JWT.secret, typeof config.JWT.secret);

            }
     };
     recuContraController.updatepassword = async (req, res) => {

        const {contrasenia} = req.body;

        try {
           const token = req.cookies.tokenRecoverytoken;
           const decoded = jsonwebtoken.verify(token, config.JWT.secret);
           

            if(!decoded.verified){
                return res.status(401).json({ message: "codigo no verificado" });
            }

           const {correo, userType} = decoded;
        const contraseniaEncriptada = await bcryptjs.hash(contrasenia, 10);

        let updateUser;
            if(userType === "cliente"){
               updateUser = await clientesMondel.findOneAndUpdate(
                  {correo},
                  {contrasenia: contraseniaEncriptada},
                  {new: true}
                );
            }
            else if(userType === "empleado"){
                updateUser = await empleadosModel.findOneAndUpdate(
                    {correo},
                    {contrasenia: contraseniaEncriptada},
                    {new: true}
                );
            }
            res.json({ message: "contraseña actualizada" });

        } catch (error) {
            res.status(500).json({ message: "error al actualizar la contraseña", error: error.message });
        }
     };


export default recuContraController;
