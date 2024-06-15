import express from 'express';
const router = express.Router();
import * as yardController from '../controller/yardController.js';
import {verifyJWT, checkBlackList} '../controller/userAuthController.JS';


router.use(verifyJWT, checkBlackList)

router.route('/')
    .get(yardController.getBays)
    .post(yardController.createBay)
    .patch()
    .delete()


export default router;


