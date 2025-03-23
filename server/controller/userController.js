import mongoose from 'mongoose';
import User from '../models/user.js';
import pkg from 'express-async-handler';
const asyncHandler = pkg;
import bcrypt from 'bcrypt';
import { DeleteUser } from '../../client/trailer-tracker/src/AdminPages/DeleteUser.js';

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

   const duplicate = User.findOne({username:username}).collation({locale:'en', strength:2}).lean().exec()
   if (duplicate) {
    return res.status(409).json({message:"Username already exists."})
   }

   const hashedPwd = await bcrypt.hash(password,10) //salt rounds
   const userObj = {username, 'password':hashedPwd, role}
   // Create and store new user
   const user = await User.create(userObj)
   
   if (user) {
    return res.status(201).json({message:"Username succesfully created."})
   } else {
    return res.status(400).json({message:"Invalid data."})
   }
})

// @desc update user
// @route PATCH /users
// @access private

const updateUser = asyncHandler(async (req,res) => {
   const {username, role, newUsername, newPassword, newRole} = req.body

   const user = User.findOne({username:username, role:role})

   if (!user) {
    res.status(400).json({message: "User does not exist"})
   }

   user.username = newUsername !== "" ? newUsername:username
   user.role = newRole !== "" ? newRole:role
   user.password = password !== "" ? newPassword:user.password

   const updatedUser = await user.save().then(() => {
    res.status(200).json({message: "User info succesfully updated"}).catch(err => {
        res.status(400).json({message: "Sth went wrong"})
    })
   })
})
// @desc delete user
// @route DELETE /users
// @access private

const deleteUser = asyncHandler(async (req,res) => {
   const {username, role} = req.body

   const user =  await User.findOne({username:username, role:role})

   if (!user) {
    res.status(400).json({messsage:"User does not exist!"})
   }
   const deleted = await User.deleteOne({username:username, role:role})

   if  (deleted.deletedCount === 1) {
    res.status(200).json({message: "User succesfully deleted."})
   } else {
    res.status(400).json({message:"Sth went wrong. Please try again later."})
   }

   
})