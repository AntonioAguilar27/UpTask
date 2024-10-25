import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, responde con un estado 400 y la lista de errores
        res.status(400).json({ errors: errors.array() });
    } else {
        // Si no hay errores, pasa al siguiente middleware
        next();
    }
};
