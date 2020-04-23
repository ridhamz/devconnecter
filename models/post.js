const mongoose = require('mongoose');
const { check } = require('express-validator');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [ 
        {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
         }
       }
    ],
    comments: [
        {
            user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
         },
         text: {
             type: String,
             require: true
         },
         name: {
              type: String
         },
         avatar: {
             type: String
         },
         date:{
             type: Date,
             default: Date.now
         }
        }
    ],
    date:{
             type: Date,
             default: Date.now
         }
})

const validate = () =>{
  return [
      check('text','Text is required')
      .not()
      .isEmpty(),
      ]   
}

const Post = mongoose.model('post',postSchema);

module.exports = {
    Post,
    validate
    };