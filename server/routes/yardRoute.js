import express from 'express';
const router = express.Router();
import * as yardController from '../controller/yardController.js';

router.route('/')
    .get(yardController.getBays)
    .post(yardController.createBay)
    .patch()
    .delete()


export default router;


