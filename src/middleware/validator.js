const CustomError = require("../utils/customError")
const { errorResponse,
    JOIValidationRegister
} = require("../utils/common")
 

exports.validation = async(req,res,next) =>{
    try {
        if (req.files.length < 2) {
            throw new CustomError("Please upload at least 2 documents", 400,);
        }

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
