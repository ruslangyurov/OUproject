import express from 'express';
const router = express.Router()
import * as userController from '../controller/userController.js';
import * as verifyToken from '../middleware/verifyJWT.js';

//router.use(verifyToken.verifyJWT)

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)
    

export default router;