import jwt from "jsonwebtoken"

export default async function authRequired(req, res, next) {

    const { token } = req.cookies //extraemos token de las cookies

    if (!token)
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => { // (token, token.env)
        if (err) return res.status(500).json({ message: "Invalid token" })
        req.user = user // guardamos user en el request, para utilizarlo en el controlador
        next()
    })
}

// este middleware provee a los controladores req.user