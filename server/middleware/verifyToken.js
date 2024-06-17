import jwt from 'jsonwebtoken';
const {verify} = jwt;

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: {err} })
            req.user = decoded.username
            next()
        }
    )
}


