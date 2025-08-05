import express from 'express';
const router = express.Router()
import * as userController from '../controller/userController.js';
import * as verifyToken from '../middleware/verifyJWT.js';

router.use(verifyToken.verifyJWT)

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUserAdmin)
    .delete(userController.deleteUser)
    
router.route('/profile')
    .get(userController.getUserInfo)
    
router.route('/profile/admin/employment')
    .patch(userController.updateUserAdminEmployment)

router.route('profile/edit')
    .patch(userController.updateUserInfoUser)

export default router;