import express from 'express';
const router = express.Router()
import * as userController from '../controller/userController.js';


router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.DeleteUser)

export default router;