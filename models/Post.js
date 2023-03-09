import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        public_id: String,
        url: String
    }
},
{
    timestamps: true
})

export const Post = mongoose.model("post", postSchema)