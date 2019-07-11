import { Router } from "express"
import {} from "http-errors"

import { validateUserId, validateUser, validatePost } from "../middleware"
import {
    getUsers,
    insertUser,
    getUserById,
    insertPost,
    getPostById
} from "../model"

const apiRouter = Router()

apiRouter.get("/users", async (req, res, next) => {
    const users = await getUsers()
    res.json(users)
})

apiRouter.get("/users/:userId", validateUserId, async (req, res) => {
    res.json(req.user)
})

apiRouter.post("/users", validateUser, async (req, res, next) => {
    const { name } = req.body

    try {
        const { id } = await insertUser({ name })
        const user = await getUserById(id)
        res.json(user)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

apiRouter.post(
    "/users/:userId/posts",
    validateUserId,
    validatePost,
    async (req, res, next) => {
        const { text } = req.body

        try {
            const { id } = await insertPost({ text, user_id: req.user.id })
            const post = await getPostById(id)
            res.json(post)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

export default apiRouter
