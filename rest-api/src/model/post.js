import db from "../data"

export const getPosts = () => db("posts")

export const getPostById = id => db("posts").where({ id: Number(id) })

export const insertPost = post =>
    db("posts")
        .insert(post)
        .then(ids => ({ id: ids[0] }))

export const updatePost = (id, post) =>
    db("posts")
        .where("id", Number(id))
        .update(post)

export const removePost = id =>
    db("posts")
        .where("id", Number(id))
        .del()
