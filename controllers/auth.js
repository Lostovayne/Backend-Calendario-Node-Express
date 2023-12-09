import { response } from "express";
import Usuario from "../models/Usuario.js";

const CreateUser = async (req, res = response) => {
    const { email, password } = req.body;

    //conexion con la bd
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese email",
            });
        }
        usuario = new Usuario(req.body);
        await usuario.save();
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            status: 201,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
        });
    }
};

const LoginUser = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: "LoginUser",
        user: { email, password },
    });
};

const RenewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "RenewToken",
    });
};

export { CreateUser, LoginUser, RenewToken };
