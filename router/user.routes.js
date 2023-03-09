import express from 'express'
import { getOneUser, loginUser, registerUser } from '../controllers/user.controllers.js'
import {body} from 'express-validator'
import { auth } from '../middlewares/auth.js'

const router = express.Router()


router.post("/register", [
    body("email", "Ingrese un correo válido")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),
    body("password", "Ingrese una contraseña con mínimo 6 caracteres")
    .not()
    .isEmpty()
    .isLength({min: 6}),
    body("username", "Ingrese su usuario")
    .not()
    .isEmpty()
] ,registerUser)

router.post("/login", [
    body("email", "Ingrese un email válido")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),
    body("password", "Ingrese una contraseña con mínimo 6 caracteres")
    .not()
    .isEmpty()
    .isLength({min: 6})
] ,loginUser)

router.get("/:id", auth, getOneUser)

export default router