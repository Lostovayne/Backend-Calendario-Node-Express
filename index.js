import express from "express";
import { router } from "./routes/auth.js";
import dbConnection from "./database/config.js";
// crear servidor de express

const app = express();

//conexion a la db

dbConnection();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Todo: authentication
//Todo: Crud

//rutas
app.use("/api/auth", router);

// listen
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
