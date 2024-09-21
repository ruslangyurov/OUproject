import jwt from 'jsonwebtoken';
const {verify} = jwt;


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized! Please Log in first!' })
    }

    const token = authHeader.split(' ')[1]
   

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.data
            req.user = decoded.username
            next()
        }
    )
}

export {verifyJWT}