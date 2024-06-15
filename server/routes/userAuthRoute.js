import express from 'express';
import {login, logout} from '../controller/userAuthController.js';
import {Router as router} from 'express';

router.route('/')
.post(login)

router.route('/refresh')
.get()

router.route('logout')
.post(logout)


