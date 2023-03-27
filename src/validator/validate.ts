import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error });
    }

    next();
}


export const validatePassword = (password: string) => {
    const regEx = new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$');
    const result = regEx.test(password);

    if (!result) {
        throw new Error('Invalid Password, debe tener mini 8 caracteres');
    }
}

