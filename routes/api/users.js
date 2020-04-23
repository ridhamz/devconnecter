const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { validationResult } = require('express-validator');
const { User, validate } = require('../../models/user')


router.post('/',validate(),async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    
    const { name, email, password } = req.body;
    try{
      let user = await User.findOne({ email });
      if(user) return res.status(400).json({ errors:[{ msg: 'User alredy exist' }]});
      const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
      })

      user = new User({
          name,
          email,
          avatar,
          password 
      })
      
      const salt = await bcrypt.genSalt(10);
      
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      

      const payload = {
          user: {
              id: user._id
          }
      };
      
     console.log(payload)
      jwt.sign(
            payload, 
            config.get('jwtToken'),
            {expiresIn: 36000},
            (err, token)=>{
                if(err) throw err;
                res.status(200).json({ token, msg :'User regitred.' })
            }
            );
      //res.status(200).send('User registred');
    }catch(err){
        console.error(err.message);
        res.status(500).send(`server error: ${err.message}`);
    }

})



module.exports = router;