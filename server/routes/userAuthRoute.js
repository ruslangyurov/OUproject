import express from 'express';
import userAuthController from '../controller/userAuthController.js';
import {Router as router} from 'express';

router.route('/')
.post()

router.route('/refresh')
.get()

router.route('logout')
.post()


module.exports = router