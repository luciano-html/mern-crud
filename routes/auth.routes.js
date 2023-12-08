import { Router } from "express"
import { login, register, obtenerTodasLosUsuarios, logout, profile } from "../controller/auth.controller.js"
import authRequired from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validaror.middleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"

const routes = Router()

routes.get('/usuarios', obtenerTodasLosUsuarios);

routes.post("/register", validateSchema(registerSchema), register)

routes.post("/login",validateSchema(loginSchema), login)

routes.post("/logout", authRequired, logout)

routes.get("/profile", authRequired, profile) //authRequired,


export default routes