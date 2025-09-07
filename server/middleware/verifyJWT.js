import jwt from 'jsonwebtoken';
import { env } from 'process';
const {verify} = jwt;


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    // console.log(authHeader)
   
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
        
                return res.status(403).json({ message: err.message })
            }
            req.user = decoded.userInfo.username
            req.role = decoded.userInfo.role
            next()
        }
    )
}

export {verifyJWT} 