const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type : String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    DOB: {
        type : Date
    },
    residentialstreet1: {
          type: String, 
    },
    residentialstreet2: {
          type: String,  
    },
    sameAsResidential: {
        type: Boolean,
        required: true
    },
    permanentstreet1: {
          type: String,
          required: function() {
            return !this.sameAsResidential;
          }
    },
    permanentstreet2: {
          type: String,
          required: function() {
            return !this.sameAsResidential;
          }
    },
    documents: [{
      fileName: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        enum: ['image', 'pdf'],
        required: true,
      },
      file: {
        type: String,
        required: true,
      },
    }]
});


const User = mongoose.model('User', userSchema);
module.exports = User;