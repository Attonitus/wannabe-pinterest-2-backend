import { validationResult } from "express-validator"
import { User } from "../models/User.js"
import bcrypt from 'bcrypt'
import { uploadImage } from "../helpers/cloudinary.js"
import fs from 'fs-extra'
import { createToken } from "../helpers/jwt.js"

export const registerUser = async(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {username, password, email} = req.body
    let image

    try {
        const checkMail = await User.find({email})
        if(checkMail.length > 0){
            return res.status(400).json({error: "El email ya está registrado"})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        if(req.files && req.files.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath) 
            image = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }

        const user = await User({username, password: hash, email, image})
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }

}

export const loginUser = async(req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "El email no se encuentra registrado"})
        }
        const checkPass = await bcrypt.compare(password, user.password)
        
        if(!checkPass){
            return res.status(400).json({error: "Contraseña incorrecta"})
        }

        const token = createToken(user)

        return res.status(200).json({user, token})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }

}

export const getOneUser = async(req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select({"password":0})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error})
    }
}