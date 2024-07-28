import express from 'express';
const router = express.Router();
import * as yardController from '../controller/yardController.js';
import {verifyJWT} from '../middleware/verifyToken.js';

//router.use(verifyJWT)


router.route('/')
    .get(yardController.getBays)
    .post(yardController.createBay)
    .patch(yardController.updateBay)
    .delete()


export default router;


