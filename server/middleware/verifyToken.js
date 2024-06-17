import * as jwt from 'jsonwebtoken'

export const verifyJWT = (req,res,next) => {
    const authHeader = request.headers.authorization || request.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorised'})
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Forbidden"})
        }



        req.user = decoded.username;
        request.tokenExp = decoded.exp;
        request.token = token;
        next();
    })

}

export const checkBlackList = async (req,res,next) => {
    const {username, token} = req.body
    const user = await User.findOne({username}).exec()
    if (token in user.Tokens) {
        return res.status(401).json({message: "You need to log in"})
    }; 
    next()
}

