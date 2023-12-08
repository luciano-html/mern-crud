import UsuarioModel from "../models/users.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js"


export async function obtenerTodasLosUsuarios(req, res) {
    try {
        const users = await UsuarioModel.find({});
        res.status(200).json(users)

    } catch (error) {
        console.error('[obtenerTodasLasusuarios]: Error de lectura de usuarios', error);
        return null;
    }
}

export async function register(req, res) {

    try {
        const { username, email, password } = req.body //traemos el formulario al server
        const userFound = await UsuarioModel.find({ email }) //buscamos si coincide el email con alguno de la basea de datos
        if (!userFound) return res.status(400).send({ message: "Usuario no encontrado" })

        const passwordHash = await bcrypt.hash(password, 10)//si coincide hasheamos la contraseña
        const newUser = new UsuarioModel({ username, email, password: passwordHash })// creamos el modelo con la contraseña ya hasheada
        const userSaved = await newUser.save() //pusheamos un obj a la base de datos

        const token = await createAccessToken({ id: newUser._id }) //creamos token de acceso con la id

        res.cookie("token", token) //a la cookie token le mandamos la variable token
        res.json({ username: userSaved.username, email: userSaved.email, id: userSaved._id }) //respondemos con los datos que necesita el front
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export async function login(req, res) {

    const { email, password } = req.body

    try {
        const userFound = await UsuarioModel.findOne({ email })
        if (!userFound) return res.status(400).send({ message: "Error al encontrar usuario" })

        const IsMatch = await bcrypt.compare(password, userFound.password)
        if (!IsMatch) res.status(400).send({ message: "La contraseña no coincide" })

        const token = await createAccessToken({ id: userFound._id })

        res.cookie("token", token)
        res.json({ username: userFound.username, email: userFound.email, id: userFound._id })
        console.log(`Usuario Logeado: ${JSON.stringify({ username: userFound.username, email: userFound.email, id: userFound._id })}`);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export function logout(req, res) {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(200).send({message:"Sesion cerrada"})
}

export async function profile(req,res){
    console.log(req.user.id);
    
    const userFound = await UsuarioModel.findById(req.user.id) //buscamos en el objeto que nos devuelve el validador el id del perfil

    if(!userFound)return res.status(500).send({message:"Usuario no encontrado"})

    return res.status(200).json({
        username:userFound.username,
        email:userFound.email,
        createAt:userFound.createdAt,
        updateAt:userFound.updatedAt
    })

}