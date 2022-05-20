const hash = require('password-hash');
const { ObjectMessage } = require('../Helpers/MessageGenerate');
const {validation, validationEmail} = require('../Helpers/validation');
const Auth = require('../Models/Auth');
/**
*
**/
module.exports.signIn = (req, res)=>{
    res.render('pages/sign-in', {
        title:'Sign In'
    });
};
/**
*
**/
module.exports.signUp = (req, res)=>{
    res.render('pages/sign-up', {
        title:'Sign Up'
    });
};
/**
*
**/
module.exports.signUpSubmit = async(req, res)=>{
    const {fname,lname,email,password} = req.body;
    if(validation(fname)){
        res.json(ObjectMessage(false, null, {fname:'First name field is required.'}));
    }else if(validation(lname)){
        res.json(ObjectMessage(false, null, {lname:'Last name field is required.'}));
    }else if(validation(email)){
        res.json(ObjectMessage(false, null, {email:'Email field is required.'}));
    }else if(!validationEmail(email)){
        res.json(ObjectMessage(false, null, {email:'Please valid email.'}));
    }else if(validation(password)){
        res.json(ObjectMessage(false, null, {password:'Password field is required.'}));
    }else if(password.length <= 5){
        res.json(ObjectMessage(false, null, {password:'Password greater then or equal 6 character.'}));
    }else{
        const findUser = await Auth.find('email', email);
        if(Object.keys(findUser).length <= 0){
            const result = await Auth.create(req.body);
            if(result){
                res.json(ObjectMessage(true, 'New account created successful.', {}, result));
            }else{
                res.json(ObjectMessage(false, null, {message:'Account is not created.'}));
            }
        }else{
            res.json(ObjectMessage(false, null, {email:'This email already exists.'}));
        }
        res.end();
    }
};
/**
*
**/
module.exports.signInSubmit = async(req, res)=>{
    const {email,password} = req.body;
    if(validation(email)){
        res.json(ObjectMessage(false, null, {email:'Email field is required.'}));
    }else if(!validationEmail(email)){
        res.json(ObjectMessage(false, null, {email:'Please valid email.'}));
    }else if(validation(password)){
        res.json(ObjectMessage(false, null, {password:'Password field is required.'}));
    }else{
        const findUser = await Auth.find('email', email);
        if(Object.keys(findUser).length > 0){
            if(findUser.email === email){
                if(hash.verify(password, findUser.password)){
                    req.session.isLoggedIn=true;
                    delete findUser.password;
                    req.session.user=findUser;
                    res.json(ObjectMessage(true, 'Yes true'))
                }else{
                    res.json(ObjectMessage(false, null, {password:'Enter valid password.'}));
                }
            }
        }
        res.json(ObjectMessage(false, null, {email:'Invalid email address.'}));
    }
};
/**
*
**/
