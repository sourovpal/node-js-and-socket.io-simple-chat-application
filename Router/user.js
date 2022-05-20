const express = require('express');
const route = express.Router();
const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');
const UserController = require('../App/Controllers/UserController');

route.use(AuthMiddleware);

route.get('/logout', UserController.logout);

route.get('/', (req, res)=>{
    res.render('pages/home', {
        title:'Chat Application',
        user:req.session.user
    });
});
/**
*
*
*
**/
module.exports = route;