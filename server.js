import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from "cors"
import cookieParser from 'cookie-parser'


import tasksRouter from './routes/tasks.routes.js'
import authRoutes from "./routes/auth.routes.js"

const app = express()
const port = process.env.PORT || 3000

const URI_LOCAL = process.env.URI_LOCAL
//! Middlewares
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

//!Rutas


app.use("/api", authRoutes)
app.use("/api", tasksRouter);


//!Conexion MONGODB
async function connectDB() {
    try {
        await mongoose.connect(URI_LOCAL)
        console.log(`Conexion a DB realizada`);
    } catch (error) {
        console.log(`Error al conectarse a DB: ${error}`);
    }
}
connectDB()

app.listen(port, () => {
    console.log(`Servidor Corriendo http://localhost:${port}/`)
})


//! VER CONTEXT 