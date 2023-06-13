const CustomError = require("../utils/customError")
const { errorResponse,
    JOIValidationRegister
} = require("../utils/common")
 

exports.validation = async(req,res,next) =>{
    try {
        const value = JOIValidationRegister(req.body);
        if (value.error) {
            console.log(value.error.details[0].message)
            throw new CustomError("VALIDATION ERROR", 400, value.error.message.split('. '));
        };

        return next()
    } catch (err) {
        return errorResponse(err, res);
    }
}