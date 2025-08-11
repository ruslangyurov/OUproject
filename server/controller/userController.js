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
   const {username, password, role, name, address, phone} = req.body;
   if (!username || !password || !role)  {
    res.status(400).json({message: "All fields are required"})
   }

   const duplicate = await User.findOne({username:username}).collation({locale:'en', strength:2}).lean().exec()
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

export const getUserInfo = asyncHandler(async (req, res) => {
  const  username  = req.user; // <-- From JWT

  console.log(username)
  try {
    const user = await User.findOne({ username }).select('-password').lean();
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



export const updateUserAdminEmployment = asyncHandler(async (req,res) => {

    const {username, newPosition, newDepartment, newStartDate, newEndDate} = req.body

    const employmentHistory = {}
    
    if (newPosition) employmentHistory.position = newPosition;
    if (newDepartment) employmentHistory.department = newDepartment;
    if (newStartDate) employmentHistory.startDate = newStartDate;
    if (newEndDate) employmentHistory.endDate = newEndDate;

    if (Object.keys(employmentHistory).length === 0) {
        return res.status(400).json({message:"Please fill in at least one of the possible options!"})
    }

    const updatedUser = await User.findOneAndUpdate({username:username}, {$push:{employmentHistory:employmentHistory}}, {new:true, runValidators:true}).exec()  
    
    if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

    res.status(200).json(updatedUser);
})

export const updateUserInfoUser = asyncHandler(async (req, res) => {
    
    const {username, newUsername, newAddress, newPhoneNumber} = req.body

    const userInfo = {}
    if (newUsername) userInfo.username = newUsername;
    if (newAddress) userInfo.address = newAddress;
    if (newPhoneNumber) userInfo.phoneNumber = newPhoneNumber; 

    if (Object.keys(userInfo).length === 0) {
        return res.status(400).json({message:"Please fill out at least of the given fields!"})
    }

    const updatedUser = await User.findOneAndUpdate({username:username}, {$set:userInfo}, {new:true, runValidators:true}).exec();
    if (!updatedUser) {
    return res.status(404).json({ message: "User not found." });
  }
    res.status(200).json(updatedUser)
})

export const updateUserAdmin = asyncHandler(async (req,res) => {
   const {username, role, newUsername, newPassword, newRole} = req.body
   
   if (!username || !role) {
    return res.status(400).json({message:"Username and role are required."})
   }

   const newInformation = {}
   if (newUsername) newInformation.username = newUsername;
   if (newPassword) newInformation.password = newPassword;
   if (newRole) newInformation.role = newRole;

  // Check if there's anything to update
  if (Object.keys(newInformation).length === 0) {
    return res.status(400).json({ message: "No valid fields provided for update." });
  } 

   let user;
   try {
    user = await User.findOneAndUpdate({username:username, role:role}, {$set:newInformation},  {new:true, runvalidators:true}).exec()
  } catch(err) {
    return res.status(400).json({message:err.message})
  }

   
   if (!user) {
    res.status(400).json({message: "User does not exist"})
   }

   res.status(200).json(user)

   
})
// @desc delete user
// @route DELETE /users
// @access private

export const deleteUser = asyncHandler(async (req,res) => {
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