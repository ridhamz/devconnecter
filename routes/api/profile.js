const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { User } = require('../../models/user');
const { Post } = require('../../models/post');
const { Profile, validate } = require('../../models/profile');
const { validationResult, check } = require('express-validator');

router.get('/me',auth,async(req,res)=>{
    try{
       const profile = await  Profile.findOne({ user: req.user.id }).populate('user',['name','avatar']);
       if(!profile) return res.send('There is no profile for this user');
       res.status(200).send(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

router.post('/',[auth, validate()], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;
    
    //build profile object 
    const profileFields = {};
    profileFields.user =  req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    //build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube =youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields },
                { new: true }
                );
                return res.json(profile);
        }
        //create new profile
        profile = new Profile(profileFields);
        await profile.save();
        res.status(200).json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
})

router.get('/',async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/user/:user_id',async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',['name','avatar']);
        if(!profile) 
        return res.status(400).json({ msg: 'There is no profile for this user' });
        res.status(200).send(profile)
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId') return res.status(400).json({ msg: 'Profile not found' });
        res.status(500).send('Server error');
    }
})

router.delete('/',auth,async (req, res) => {
    try {
         //remove posts
         await Post.deleteMany({ user: req.user.id });
         //remove profile 
         await Profile.findOneAndRemove({ user: req.user.id });
        //remove user
        await User.findOneAndRemove({ _id: req.user.id}); 

        res.status(200).send('User Deleted');

    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId') return res.status(400).json({ msg: 'Profile not found' });
        res.status(500).send('Server error');
    }
})

router.put('/experience', [auth, [
    check('title','Title is required')
      .not()
      .isEmpty(),
    check('from','From date is required') 
      .not()
      .isEmpty()
]], 
async (req, res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()) 
       return res.status(400).json({ errors: errors.array() });
     const {
         title,
         company,
         location,
         from,
         to,
         current,
         description
     } = req.body;
     const newExp = {
         title,
         company,
         location,
         from,
         to,
         current,
         description
     }
     try {
         const profile = await Profile.findOne({ user: req.user.id });
         profile.experience= newExp;
         await profile.save();
         res.status(200).send(profile);
     } catch (err) {
         console.log(err.message);
         res.status(500).send('server error')
     }
})

router.delete('/experience/:exp_id', auth, async (req, res)=>{
   try {
       const profile = await Profile.findOne({ user: req.user.id });
       //Get remove index
       const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
       profile.experience.splice(removeIndex, 1);
       await profile.save();
       res.status(200).send(profile);
   } catch (err) {
       console.log(err.message);
       res.status(500).send('server error');
       
   }
})

router.put('/education', [auth, [
    check('school','School is required')
      .not()
      .isEmpty(),
    check('degree','Degree is required') 
      .not()
      .isEmpty(),
    check('fieldofstudy','Field of study is required') 
      .not()
      .isEmpty(),
    check('from','From date is required') 
      .not()
      .isEmpty()
]], 
async (req, res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()) 
       return res.status(400).json({ errors: errors.array() });
     const {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description
     } = req.body;
     const newEdu = {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description
     }
     try {
         const profile = await Profile.findOne({ user: req.user.id });
         profile.education= newEdu;
         await profile.save();
         res.status(200).send(profile);
     } catch (err) {
         console.log(err.message);
         res.status(500).send('server error')
     }
})

router.delete('/education/:edu_id', auth, async (req, res)=>{
   try {
       const profile = await Profile.findOne({ user: req.user.id });
       //Get remove index
       const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id);
       profile.education.splice(removeIndex, 1);
       await profile.save();
       res.status(200).send(profile);
   } catch (err) {
       console.log(err.message);
       res.status(500).send('server error');
       
   }
})

router.get('/github/:username', async (req, res)=>{
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
               sort=created:asc&client_id=${config.get('githubClientId')}&
               client_secret=${config.get('githubSecretId')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }
        request(options, (error, response, body)=>{
            if(error) console.error(error);
           // if(response.statusCode !== 200) 
            //return res.send('eror')
             //return response.status(400).json({ msg: 'No Github profile found.' });
            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
        
    }
})



module.exports = router;