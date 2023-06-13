const UserModel = require("../models/user")

const fs = require('fs');
const path = require('path');
const CustomError = require("../utils/customError");

exports.usercreated = async (requestData) => {

const isEmailExists = await UserModel.findOne({ email: requestData.email })
    if (isEmailExists) {
        throw new CustomError("EMAIL ALREADY EXISTS", 400);
    }
    let newUser = await UserModel.create({
        firstName: requestData.firstName,
        lastName: requestData.lastName,
        email: requestData.email,
        DOB: requestData.DOB,
        residentialstreet1: requestData.residentialstreet1,
        residentialstreet2 : requestData.residentialstreet2,
        sameAsResidential : requestData.sameAsResidential,
        permanentstreet1 : requestData.permanentstreet1,
        permanentstreet2 : requestData.permanentstreet2,
        documents: requestData.documents
        
    })

    const uploadedDocuments = [];
    for (const document of requestData.documents) {
      const fileExtension = path.extname(document.fileName);
      const newFileName = `${newUser._id}_${Date.now()}${fileExtension}`;
      const filePath = path.join('uploads', newFileName);
  
      fs.writeFileSync(filePath, document.file, 'base64');  
      const uploadedDocument = {
        fileName: document.fileName,
        fileType: document.fileType,
        file: newFileName
      };
  
      uploadedDocuments.push(uploadedDocument);
    }
  
    newUser.documents = uploadedDocuments;
    await newUser.save();
    
    return { status: true,
    message: "User Registered Successfully",
    data: newUser,
    }
}


// exports.usercreated = async (req) => {

//     const isEmailExists = await UserModel.findOne({ email: req.body.email })
//     if (isEmailExists) {
//         throw new CustomError("EMAIL ALREADY EXISTS", 400);
//     }
//     let newUser = await UserModel.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         DOB: req.body.DOB,
//         residentialstreet1: req.body.residentialstreet1,
//         residentialstreet2 : req.body.residentialstreet2,
//         sameAsResidential : req.body.sameAsResidential,
//         permanentstreet1 : req.body.permanentstreet1,
//         permanentstreet2 : req.body.permanentstreet2
        
//     })   
//     return { status: true,
//     message: "User Registered Successfully",
//     data: newUser,
//     }
// }


exports.getusers = async () => {
    const users= UserModel.find();
    return users;   
}