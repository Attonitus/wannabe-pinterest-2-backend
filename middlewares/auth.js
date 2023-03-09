import jwt from 'jwt-simple'
import moment from 'moment'
import { secret } from '../helpers/jwt.js'

export const auth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).json({error: "No hay cabecera de autenticación"})
    }

    const token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        const payload = jwt.decode(token, secret)

        if(payload.exp <= moment().unix()){
            return res.status(400).json({error: "Token expirado"})
        }

        req.user = payload

    } catch (error) {
        return res.status(400).json({error: "Token inválido"})
    }

    next()

}