import { getUserById } from "../model"
import { BadRequest } from "http-errors"

export const handle404 = (req, _res, next) => {
    const { method, path } = req
    const msg = `${method} ${path} has not been implemented.`
    next(NotFound(msg))
}

export const handle500 = ({ status = 500, name, message }, _req, res, next) => {
    if (res.headersSent) return next()
    res.status(status).json({ name, statusCode: status, message })
}

export const validateUserId = async (req, res, next) => {
    const { userId } = req.params

    try {
        const user = await getUserById(userId)
        if (!user) throw BadRequest("Invalid user id")
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}
