const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { Schema } = mongoose;

// Schema is Collection is Table 

// Designd Collection
const usersSchema = new Schema({
    username: {type: String, require: true, trim: true, unique: true, index: true},
    password: {type : String, require: true, min: 10, trim: true},
    firstname: {type: String, require: true, trim: true},
    lastname: {type: String, require: true, trim: true},
    nickname : {type: String, require: true, trim: true},
    birthday : {type: Date, require: true, trim: true},
    gender: {type: String, require: true, trim: true},
    role: {type: String, require: true, trim: true, default: "student"}
},{
    collation: { 
      locale: 'en_US', 
      strength: 1 
  }
});

// encryptPassword
usersSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(5)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

// checkPassword
usersSchema.methods.checkPassword = async function(password){
   const isValid = await bcrypt.compare(password, this.password)
   return isValid
}

//Model name must match Collection name
module.exports = mongoose.model('users',usersSchema)