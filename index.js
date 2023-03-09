import express from 'express'
import 'dotenv/config'
import { connectdb } from './database/connectdb.js'
import userRouter from './router/user.routes.js'
import postRouter from './router/post.routes.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'

const app = express()
connectdb()

app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

const url = "/api/v2"
app.use(`${url}/users`, userRouter)
app.use(`${url}/post`, postRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log("http://localhost:"+PORT))
