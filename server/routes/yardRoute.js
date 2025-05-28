import express from 'express';
const router = express.Router();
import * as yardController from '../controller/yardController.js';
import {verifyJWT} from '../middleware/verifyJWT.js';

router.use(verifyJWT)


router.route('/')
    .post(yardController.createBay)
    .patch(yardController.updateBay)
    .delete()

router.route('/FullTrailers').get(yardController.getFullTrailers)

router.route('/Search').get(yardController.getBay)

router.route('/EmptyTrailers').get(yardController.getEmptyTrailers)


export default router;


