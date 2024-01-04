import { response } from "express";
import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "./../helpers/jwt.js";

const CreateUser = async (req, res = response) => {
    const { email, password } = req.body;

    //* conexion con la bd
    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese email",
            });
        }

        //* Crear el usuario usando el modelo de MongoDb
        usuario = new Usuario(req.body);

        //* Encripar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        await usuario.save();

        //* Generar el token del usuario
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            status: 201,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
        });
    }
};

const LoginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe",
            });
        }
        const compare = bcryptjs.compareSync(password, user.password);

        if (!compare) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es incorrecta",
            });
        }

        //* Generar el token del usuario
        const token = await generarJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            status: 200,
            token: token,
        });
    } catch (error) {}
};

const RenewToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token,
    });
};

export { CreateUser, LoginUser, RenewToken };
