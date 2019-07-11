import db from "../data"

export const getUsers = () => db("users")

export const getUserById = id =>
    db("users")
        .where({ id: Number(id) })
        .first()

export const insertUser = user =>
    db("users")
        .insert(user)
        .then(ids => ({ id: ids[0] }))

export const updateUser = (id, user) =>
    db("users")
        .where("id", Number(id))
        .update(user)

export const removeUser = id =>
    db("users")
        .where("id", Number(id))
        .del()

export const getUserPosts = userId =>
    db("posts as p")
        .join("users as u", "u.id", "p.user_id")
        .select("p.id", "p.text", "u.name as postedBy")
        .where("p.user_id", userId)
