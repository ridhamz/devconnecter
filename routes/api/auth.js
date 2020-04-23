const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const { User, validateAuth } = require('../../models/user')

router.get('/',auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }catch(err){
      console.log(err.message);
      res.status(500).send('server error');
    }
})


router.post('/',validateAuth(),async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    
    const { email, password } = req.body;
    try{
      let user = await User.findOne({ email });
      if(!user) return res.status(400)
                         .json({ errors:[{ msg: 'Invalid Credentials' }]});
     
    isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) if(user) return res.status(400)
                                    .json({ errors:[{ msg: 'invalid Credentials' }]});
    
      const payload = {
          user: {
              id: user.id,
              name: user.name
          }
      };

      jwt.sign(
            payload, 
            config.get('jwtToken'),
            {expiresIn: 36000},
            (err, token)=>{
                if(err) throw err;
                res.status(200)
                   .json({ token, msg :`Login as ${user.name}.` })
            }
            );
      
    }catch(err){
        console.error(err.message);
        res.status(500).send(`server error: ${err.message}`);
    }

})

module.exports = router;