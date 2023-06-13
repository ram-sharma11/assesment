const {registerValidations} = require('../validations/validations')
exports.errorResponse = async (err, res) => {
    const error = {};
    const statusCode = err.status || 500;
    error.status = false;
    if(err.errors){
      return res.status(statusCode).json({
        error : err,
      })
    }
    error.message = err.message;
    return res.status(statusCode).json(error);
  };

  exports.JOIValidationRegister = (body)=>{
    return registerValidations.validate(body,{abortEarly : false,});
  }