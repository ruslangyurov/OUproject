import express from 'express';
const router = express.Router();
import * as yardController from '../controller/yardController.js';
import {verifyJWT} from '../middleware/verifyToken.js';

//router.use(verifyJWT)


router.route('/')
    .get(yardController.getEmptyTrailers)
    .post(yardController.createBay)
    .patch(yardController.updateBay)
    .delete()

router.route('/FullTrailers').get(yardController.getFullTrailers)

router.route('/Search').get(yardController.getBay)


export default router;


