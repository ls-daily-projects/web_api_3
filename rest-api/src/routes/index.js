import { Router } from "express"
import {} from "http-errors"
import { getUsers } from "../model"

const apiRouter = Router()

apiRouter.get("/users", async (req, res, next) => {
    const users = await getUsers()
    res.json(users)
})

export default apiRouter
