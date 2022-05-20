const express = require('express');
const route = express.Router();
const AuthController = require('../App/Controllers/AuthController');
const CheckLoginMiddleware = require('../App/Middlewares/CheckLoginMiddleware');

route.use(CheckLoginMiddleware);

route.get('/sign-in', AuthController.signIn);
route.post('/sign-in', AuthController.signInSubmit);
route.get('/sign-up', AuthController.signUp);
route.post('/sign-up', AuthController.signUpSubmit);

/**
*
*
*
**/
module.exports = route;