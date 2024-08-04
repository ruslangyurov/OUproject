import express from 'express';
const router = express.Router();
import * as yardController from '../controller/yardController.js';
import {verifyJWT} from '../middleware/verifyToken.js';

router.route('/search')
    .get(yardController.getBay)


export default router;