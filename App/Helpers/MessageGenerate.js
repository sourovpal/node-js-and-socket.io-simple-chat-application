module.exports.ObjectMessage = (status, message=null, errors={}, data=null)=>{
    const responce = {};
    responce.status=status;
    message?responce.message=message:null;
    Object.keys(errors).length?responce.errors=errors:null;
    data?responce.data=data:null;
    return responce;
};