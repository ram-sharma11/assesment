const joi = require('joi');
const CustomError = require('../utils/customError');

module.exports.registerValidations = joi.object({
    firstName : joi.string().required(),
    lastName : joi.string().required(),
    email : joi.string().required().email(),
    DOB : joi.date().required().max('now').iso().raw()
    .custom((value, helpers) => {
        const age = calculateAge(value);
        if (age < 18) {
            throw new CustomError("Below 18", 400);
        }
        return value;
    }),
    residentialstreet1: joi.string().optional(),
    residentialstreet2: joi.string().optional(),
    sameAsResidential: joi.boolean().required(),
    permanentstreet1 : joi.string().optional(),
    permanentstreet2 : joi.string().optional(),
})




function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}