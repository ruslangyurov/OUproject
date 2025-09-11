import express from 'express';
const router = express.Router()
import asyncHandler from 'express-async-handler';
import * as userController from '../controller/userController.js';
import {verifyJWT} from '../middleware/verifyJWT.js';

router.use(verifyJWT)

router.route('/')
    .get(asyncHandler(userController.getAllUsers))
    .post(asyncHandler(userController.createNewUser))
    .patch(asyncHandler(userController.updateUserAdmin))
    .delete(asyncHandler(userController.deleteUser))
    
router.route('/profile')
    .get(asyncHandler(userController.getUserInfo))
    
router.route('/profile/admin/employment')
    .patch(asyncHandler(userController.updateUserAdminEmployment))

router.route('/profile/edit')
    .patch(asyncHandler(userController.updateUserInfoUser))

export default router;