const UserModel = require("../models/user")

const CustomError = require("../utils/customError");

exports.usercreated = async (req) => {
  const documents = req.files;
    const isEmailExists = await UserModel.findOne({ email: req.body.email })
    if (isEmailExists) {
        throw new CustomError("EMAIL ALREADY EXISTS", 400);
    }
    let newUser = await UserModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        DOB: req.body.DOB,
        residentialstreet1: req.body.residentialstreet1,
        residentialstreet2 : req.body.residentialstreet2,
        sameAsResidential : req.body.sameAsResidential,
        permanentstreet1 : req.body.permanentstreet1,
        permanentstreet2 : req.body.permanentstreet2,
        documents: documents.map((file) => ({
          fileName: file.originalname,
          fileType: file.originalname.split('.').pop(),
          file: file.path,
        })),
        
    })   
    return { status: true,
    message: "User Registered Successfully",
    data: newUser,
    }
}



exports.getusers = async () => {
    const users= UserModel.find();
    return users;   
}