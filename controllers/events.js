import { response } from "express";
import Evento from "../models/Evento.js";

const getEventos = async (req, res = response) => {
    const eventos = await Evento.find().populate("user", "name");

    if (!eventos) {
        return res.status(404).json({
            ok: false,
            msg: "No hay eventos",
        });
    }

    try {
        res.status(200).json({
            ok: true,
            eventos,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
            error: error,
        });
    }
};

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        await evento.save();

        res.status(201).json({
            ok: true,
            evento,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
            error: error,
        });
    }
};

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro el evento",
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar este evento",
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid,
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {
            new: true,
        });

        res.status(200).json({
            ok: true,
            evento: eventoActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
        });
    }
};

const eliminarEvento = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro el evento",
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar este evento",
            });
        }

        await Evento.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            msg: "Evento eliminado",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
            error: error,
        });
    }
};

export { getEventos, crearEvento, actualizarEvento, eliminarEvento };
