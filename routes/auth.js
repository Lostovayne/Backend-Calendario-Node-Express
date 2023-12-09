/*
   Rutas de Usuarios / Auth
   host + /api/auth
*/

import { Router } from "express";
import { check } from "express-validator";
export const router = Router();

import { CreateUser, LoginUser, RenewToken } from "../controllers/auth.js";
import { fieldValidator } from "../middlewares/field-validator.js";

router.post(
    "/new",
    [
        //middleware
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("password", "La contraseña debe ser de 6 caracteres").isLength({ min: 6 }),
        fieldValidator,
    ],
    CreateUser
);

router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        fieldValidator,
    ],
    LoginUser
);

router.get("/renew", RenewToken);
