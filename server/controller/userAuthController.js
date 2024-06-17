import user from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import pkg from 'express-async-handler';
const asyncHandler = pkg;
import {verifyJWT} from '../middleware/verifyToken.js'



// @route POST/auth
// @access PUBLIC
const login = asyncHandler(async(req, res) => {
    const {username, password} = req.body

    if (!username||!password) {
        return res.status(400).json({message:'All fields are required'})
    }

    const currentUser = await user.findOne({username}).exec()

    if (!currentUser) {
        return res.status(401).json({message:"Unauthorised"})
    }

    const match = bcrypt.compare(password, currentUser.password)

    if (!match) {
        return res.status(401).json({message:"Unauthorised"})
    }
    
    const accessToken = sign({username:currentUser.username}, process.env.TOKEN_SECRET, {expiresIn: "1d"})

    const refreshToken = sign({username:currentUser.username}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: "1d"})

    // Create a secure cookie with the refresh token

    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
    
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    res.json({accessToken})
})


    const refresh = (req, res) => {
        const cookies = req.cookies
    
        if (!(cookies?.jwt)) return res.status(401).json({ message: 'Unauthorized' })
    
        const refreshToken = cookies.jwt
    
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message: 'Forbidden' })
    
                const foundUser = await user.findOne({ username: decoded.username }).exec()
    
                if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
    
                const accessToken = jwt.sign({usrname:foundUser.username},process.env.TOKEN_SECRET,{ expiresIn: '15m' })
    
                res.json({ accessToken })
            }
        )
    }
    
    // @desc Logout
    // @route POST /auth/logout
    // @access Public - just to clear cookie if exists
    const logout = (req, res) => {
        const cookies = req.cookies
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'})
        res.json({ message: 'Cookie cleared' })
    }
    

export {login,refresh, logout};