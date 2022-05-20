/**
*
**/
(function(){
    "use strict";
    function validation(val){
        val = val.trim();
        if(val == '' || val == null){
            return true;
        }
        return false;
    }
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    $('#signUpForm').submit((event)=>{
        event.preventDefault();
        var fname       = $('#fname').val(),
        lname           = $('#lname').val(),
        email           = $('#email').val(),
        password        = $('#password').val(),
        confirmPassword = $('#confirmPassword').val();
        if(validation(fname)){
            alert('First name field is required.')
        }else if(validation(lname)){
            alert('Last name field is required.')
        }else if(validation(email)){
            alert('Email field is required.')
        }else if(!validateEmail(email)){
            alert('Please valid email.')
        }else if(validation(password)){
            alert('Password field is required.')
        }else if(password.length <= 5){
            alert('Password greater then or equal 6 character.')
        }else if(password !== confirmPassword){
            alert('Confirm password not match.')
        }else{
            var formdata = {fname,lname,email,password};
            axios.post(location.href, formdata)
            .then(({data})=>{
                console.log(data);
                if(data.status){
                    alert(data.message);
                    $('#signUpForm')[0].reset();
                }else{
                    Object.keys(data.errors).forEach((key)=>{
                        alert(data.errors[key]);
                    });
                }
            });
        }
    });
    /**
    * 
    **/
    $('#signInForm').submit((event)=>{
        event.preventDefault();
        var email = $('#email').val(),
        password  = $('#password').val();
        if(validation(email)){
            alert('Email field is required.')
        }else if(!validateEmail(email)){
            alert('Please valid email.')
        }else if(validation(password)){
            alert('Password field is required.')
        }else{
            var formdata = {email,password};
            axios.post(location.href, formdata)
            .then(({data})=>{
                if(data.status){
                    return location.href='/';
                }
                Object.keys(data.errors).forEach((key)=>{
                    alert(data.errors[key]);
                });
            });
        }
    });

})();