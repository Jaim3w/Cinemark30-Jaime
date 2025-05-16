import express from "express";
import cookieParser from "cookie-parser";
import empleadoRoute from "./src/routes/empleado.js";
import registerEmpleadoRoute from "./src/routes/registerEmpleados.js";

const app = express();

app.use(express.json());

app.use(cookieParser());


app.use("/api/registerEmpleado", registerEmpleadoRoute)
app.use("/api/empleado", empleadoRoute)

export default app;
