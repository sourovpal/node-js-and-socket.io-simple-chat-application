module.exports.logout = (req, res)=>{
    delete req.session.isLoggedIn;
    req.session.destroy(()=>{});
    res.redirect('/user/sign-in');
    res.end();
};
/**
*
**/