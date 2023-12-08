import jwt from "jsonwebtoken"


export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(  //(payload, secret, expiracion, callback)
            payload,//payload son los datos que quiero incluir en el toquen[ej: datos de usuarios, contraseñas, etc]
            process.env.TOKEN_SECRET, // La clave secreta utilizada para firmar el token. ""semilla?""
            { expiresIn: "1d" },
            (err, token) => {// Callback que maneja el resultado de la operación de firma.
                if (err) reject(err);// Si hay un error al firmar el token, se rechaza la Promise con el error.
                resolve(token)// Si la firma es exitosa, se resuelve la Promise con el token generado.
            }
        )
    })
}


