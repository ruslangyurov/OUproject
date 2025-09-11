import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import * as yardController from '../controller/yardController.js';
import {verify} from '../middleware/verifyJWT.js';



router.use(verify)


router.route('/')
    .post(yardController.createBay)
    .patch(yardController.updateBay)
    .delete()

router.route('/FullTrailers').get(asyncHandler(yardController.getFullTrailers))

router.route('/Search').get(asyncHandler(yardController.getBay))

router.route('/EmptyTrailers').get(asyncHandler(yardController.getEmptyTrailers))

router.route('/create-bays').post(yardController.createBays)


export default router;


