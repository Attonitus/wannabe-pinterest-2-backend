import {v2} from 'cloudinary'

v2.config({
    "cloud_name": process.env.CLOUD_NAME,
    "api_key": process.env.API_KEY,
    "api_secret": process.env.API_SECRET
})


export const uploadImage = async(path) => {
    return await v2.uploader.upload(path, {
        folder : "pinterest"
    })
}

export const deleteImage = async(id) => {
    return await v2.uploader.destroy(id)
}