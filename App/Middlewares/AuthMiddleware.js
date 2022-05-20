module.exports = (req, res, next)=>{
    if(req.session.isLoggedIn){
        return next();
    }
    return res.redirect('/user/sign-in');
}