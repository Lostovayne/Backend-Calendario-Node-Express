import { Router } from "express";
import {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
} from "../controllers/events.js";
import { validarJwt } from "../middlewares/validar-jwt.js";
import { fieldValidator } from "../middlewares/field-validator.js";
import { check } from "express-validator";
import isDate from "../helpers/isDate.js";
/*
    Ruta eventos
    host + /api/events
*/

export const router = Router();
// validando con el JWT
router.use(validarJwt);

// Todas tienen que pasar por la validacion del token

router.get("/", getEventos);
router.post(
    "/",

    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalización es obligatoria").custom(isDate),
        fieldValidator,
    ],

    crearEvento
);
router.put(
    "/:id",
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalización es obligatoria").custom(isDate),
        fieldValidator,
    ],
    actualizarEvento
);
router.delete("/:id", eliminarEvento);
