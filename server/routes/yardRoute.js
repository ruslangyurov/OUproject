import express from 'express';
const router = express.Router();
import pkg from 'express-async-handler';
const asyncHandler = pkg;
import * as yardController from '../controller/yardController.js';
import {verifyJWT} from '../middleware/verifyJWT.js';



// router.use(verifyJWT)


router.route('/')
    .post(yardController.createBay)
    .patch(yardController.updateBay)
    .delete()

router.route('/FullTrailers').get(yardController.asyncHandler(getFullTrailers))

router.route('/Search').get(yardController.asyncHandler(getBay))

router.route('/EmptyTrailers').get(yardController.asyncHandler(getEmptyTrailers))

router.route('/create-bays').post(yardController.createBays)


export default router;


