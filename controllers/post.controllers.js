import { uploadImage } from "../helpers/cloudinary.js"
import { Post } from "../models/Post.js"
import fs from 'fs-extra'
import { User } from "../models/User.js"

export const getAllPosts = async(req, res) => {
    try {
        const post = await Post.find({}).sort({"createdAt":-1})
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const createPost = async(req, res) => {
    const {title, description} = req.body
    const userId = req.user.id

    let image

    try {        
        if(req.files && req.files.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }
        const post = await Post({title, description, userId, image})
        await post.save()
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).json(error)
    }

}

export const getOnePost = async(req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        const userInfo = await User.findById(post.userId).select({"password":0})
        return res.status(200).json({post, userInfo})
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const deletePost = async(req, res) => {

    const postId = req.params.id
    const {id} = req.user

    try {
        const post = await Post.findById(postId)

        if(!(post.userId === id)){
            return res.status(400).json({error: "No puedes eliminar un post que no es tuyo"})   
        }
        await Post.deleteOne(post)
        return res.status(200).json({msg: "Post borrado"})
    } catch (error) {
        return res.status(400).json({error})
    }
}

export const searchPost = async(req, res) => {
    const busqueda = req.params.search
    try {
        const posts = await Post.find({"$or": [
            {"title": {"$regex" : busqueda, "$options" :"i"}},
            {"description": {"$regex" : busqueda, "$options" :"i"}},
        ]}).sort({"createdAt":-1})
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).json({error})
    }
}