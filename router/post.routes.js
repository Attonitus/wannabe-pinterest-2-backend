import express from 'express'
import { createPost, deletePost, getAllPosts, getOnePost, searchPost } from '../controllers/post.controllers.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.get("/", auth ,getAllPosts)
router.post("/", auth ,createPost)
router.get("/:id", auth, getOnePost)
router.delete("/:id", auth, deletePost)
router.get("/buscar/:search", auth, searchPost)

export default router