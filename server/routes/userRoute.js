import express from 'express';
const router = express.Router()
import userController from '../controller/userController';

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.DeleteUser)

    export default router;