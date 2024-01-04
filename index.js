import express from "express";
import dbConnection from "./database/config.js";
import { router } from "./routes/auth.js";
import { router as eventsRouter } from "./routes/events.js";
import cors from "cors";
// crear servidor de express

const app = express();

//conexion a la db

dbConnection();

// cors

app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Todo: authentication
//Todo: Crud

//rutas
app.use("/api/auth", router);
app.use("/api/events", eventsRouter);

// listen
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
