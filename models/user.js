const mongoose = require('mongoose');
const { check } = require('express-validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});





const validate = () =>{
  return [
      check('name','Name is required')
      .not()
      .isEmpty(),
      check('email','Please include a valid email')
      .isEmail(),
      check('password','Please enter password with 6 or more characters')
      .isLength({ min: 6 }) 
      ]   
}
const validateAuth = () =>{
  return [
    check('email','Please include a valid email')
      .isEmail(),
    check('password','Password is required.')
      .exists()]
      
}

const User = mongoose.model('user',userSchema);

module.exports = {
    User,
    userSchema,
    validateAuth,
    validate
};