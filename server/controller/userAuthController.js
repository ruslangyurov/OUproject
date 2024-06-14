import user from '../models/user.js'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import {asyncHandler} from 'express'
import verifyToken from '../middleware/verifyToken.js'



// @route POST/auth
// @access PUBLIC
const login = asyncHandler(async(req, res) => {
    const {username, password} = req.body

    if (!username||!password) {
        return res.status(400).json({message:'All fields are required'})
    }

    const user = await User.findOne({username}).exec()

    if (!user) {
        return res.status(401).json({message:"Unauthorised"})
    }

    const match = bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(401).json({message:"Unauthorised"})
    }
    
    const accessToken = jwt.sign(user.username, process.ENV.TOKEN_SECRET, {expiresIn: '1800s'})

    res.json({accessToken})


})

const logout = asyncHandler(async(req, res) => {

    const {username, token} = req.body

    const user = await User.findOne({username}).exec()

    if (!user) {
        return res.status(401).json({message:"Unauthorised"})

    user.token.push()
    }




})


