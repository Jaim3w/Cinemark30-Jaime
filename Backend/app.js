import express from "express";
import cookieParser from "cookie-parser";
import empleadoRoute from "./src/routes/empleado.js";
import registerEmpleadoRoute from "./src/routes/registerEmpleados.js";
import peliculasRouter from "./src/routes/peliculas.js";
import clientesRouter from "./src/routes/clientes.js";
import loginRouter from "./src/routes/loginrouter.js";
import logoutRouter from "./src/routes/logout.js";
import recuperarContraseniaRouter from "./src/routes/recuperarContrasenia.js";


const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/registerEmpleado", registerEmpleadoRoute)
app.use("/api/empleado", empleadoRoute)
app.use("/api/peliculas", peliculasRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/login", loginRouter); 
app.use("/api/logout", logoutRouter);
app.use("/api/recuContra", recuperarContraseniaRouter);

export default app;
