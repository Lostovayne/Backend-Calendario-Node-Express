import { response } from "express";
import { validationResult } from "express-validator";

export const fieldValidator = (req, res = response, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: error.mapped(),
        });
    }

    next();
};
