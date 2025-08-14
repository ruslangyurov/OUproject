import express from 'express';
import * as userAuthController from '../controller/userAuthController.js';
const router = express.Router();




router.route('/').post(userAuthController.login)

router.route('/refresh').get(userAuthController.refresh)

router.route('/logout').post(userAuthController.logout)

export default router;
