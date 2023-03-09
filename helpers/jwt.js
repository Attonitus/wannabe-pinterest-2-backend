import jwt from 'jwt-simple'
import moment from 'moment'

export const secret = "pH03nIx_WrIgHt_13"

export const createToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        password: user.password,
        username: user.username,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    }

    return jwt.encode(payload, secret)
}