import mongoose from 'mongoose';
import User from '../models/user.js';
import pkg from 'express-async-handler';
const asyncHandler = pkg;
import bcrypt from 'bcrypt';

// @desc get all users
// @route GET /users
// @access private

export const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean();
    if (!users) {
        return res.status(400).json({message: "No users found"})
    }
    return users;
})

// @desc create new user
// @route POST /users
// @access private

export const createNewUser = asyncHandler(async (req,res) => {
   
   //confirm data
   const {username, password, role} = req.body;
   if (!username || !password) {
    res.status(400).json({message: "All fields are required"})
   }
   const hashedPwd = await bcrypt.hash(password,10) //salt rounds
   const userObj = {username, 'password':hashedPwd, role}
   // Create and store new user
   const user = await User.create(userObj)
   .then(() => res.status(201).json({message:"New user added"}))
   .catch(err => res.status(400).json("Error: " + err))
})

// @desc update user
// @route PATCH /users
// @access private

const updateUser = asyncHandler(async (req,res) => {
   
})
// @desc delete user
// @route DELETE /users
// @access private

const delelteUser = asyncHandler(async (req,res) => {
   
})