import { Router } from "express";
import { getAll, getByAlte, create, remove, update, getById } from "../controllers/personaje.controller";
import { check } from "express-validator";
import { validate, validatePassword } from "../validator/validate";

export const personajeRoute = Router();

const rols = ['villian', 'hero', 'anti-hero'];

personajeRoute.get('/', getAll);

personajeRoute.get('/:rol', [
    check('rol')
        .trim()
        .not()
        .isEmpty()
        .withMessage('El rol es requerido'),
    validate
], getAll);

personajeRoute.get('/byId/:id', [
    check('id')
        .isInt()
        .withMessage('El id debe ser un numero entero'),
    validate
], getById);

personajeRoute.get('/alte/:alte', [
    check('alte')
        .trim()
        .not()
        .isEmpty()
        .withMessage('El alte es requerido'),
    validate
], getByAlte);

personajeRoute.post('/', [
    check('nombre')
        .not()
        .isEmpty()
        .withMessage('El nombre es requerido'),

    check('alte')
        .not()
        .isEmpty()
        .withMessage('El alte es requerido'),
    
    check('password')
    .custom(validatePassword),
    
    check('rol')
    .isIn(rols)
    .withMessage(`El rol debe estar entre los siguientes ${rols}`),
    
    validate
], create);

personajeRoute.delete('/:id', remove);

personajeRoute.put('/:id', update);
