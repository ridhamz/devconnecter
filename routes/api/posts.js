const express = require('express');
const router = express.Router();
const { Post, validate } = require('../../models/post');
const { User } = require('../../models/user');
const auth = require('../../middleware/auth');
const ObjectId = require('mongoose').Types.ObjectId;
const { validationResult } = require('express-validator')

//get all posts
router.get('/',auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.status(200).send(posts)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
})

//get post bu id :
router.get('/:id', auth, async(req,res)=>{
    try {
        if(!ObjectId.isValid(req.params.id)) 
           return res.status(400).send('Invalid id');
        const post = await Post.findById(req.params.id);
        if(!post) 
          return res.status(404).send('there is no post with this id.');
        res.status(200).send(post)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
    
})

//add post 
router.post('/',[auth, validate()], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });
   
    try{
    const user = await User.findById( req.user.id );
    if(!user) 
      return res.status(400).send('User not found.');
     
    const post = new Post({
        user: user._id,
        name: user.name,
        avatar: user.avatar,
        text: req.body.text
    })

    await post.save();
    res.status(200).send(post)
    }catch(err){
        console.log(err.message)
        res.status(500).send("server error");
    }


})

//delete post bu id :
router.delete('/:id', auth, async(req,res)=>{
    try {
        if(!ObjectId.isValid(req.params.id)) 
           return res.status(400).send('Invalid id');
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).send('there is no post with this id.');
        //if(post.user.toString() !== req.user.id) 
        //return res.status(400).send('You are not able to delete this user');
        await post.remove();
        res.status(200).send('post removed');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
    
})

//update post 
router.put('/:id',[auth,validate()], async (req,res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()) 
       return res.status(400).json({ errors: errors.array() });
     if(!ObjectId.isValid(req.params.id)) 
           return res.status(400).send('Invalid id'); 
     try {
         const post = await Post.findById(req.params.id);
         if(!post)
           return res.status(404).send('Post not found.');
         await post.updateOne({
             text:req.body.text
         })
         res.status(200).send(post)
     } catch (err) {
         console.log(err.message);
         res.status(500).send('server error');
         
     }
})

//add like 
router.put('/like/:id',[auth] ,async(req, res)=>{
     if(!ObjectId.isValid(req.params.id)) 
           return res.status(400).send('Invalid id');
     try {
         const post = await Post.findById(req.params.id);
         if(!post)
            return res.status(404).send('Post not found');
         const { likes } = post;
         const user_id = req.user.id;
         if(likes.filter(like => like.user.toString() === user_id ).length > 0)
            return res.status(400).send('Post already  liked');
         likes.unshift({user: user_id });
        
         await post.updateOne({
             likes
         })
         res.status(200).send(post)
         
     } catch (err) {
         console.log(err.message);
         res.status(500).send('server error');
     }
})

//dislike post
router.put('/unlike/:id',[auth] ,async(req, res)=>{
     if(!ObjectId.isValid(req.params.id)) 
           return res.status(400).send('Invalid id');
     try {
         const post = await Post.findById(req.params.id);
         if(!post)
            return res.status(404).send('Post not found');
         const { likes } = post;
         const user_id = req.user.id;
         if(likes.filter(like => like.user.toString() === user_id ).length === 0)
            return res.status(400).send('Post already  unliked');
         const index = likes.findIndex(like => like.user.toString() === user_id);
         likes.splice(index,1);
        
         await post.updateOne({
             likes
         })
         res.status(200).send(post)
         
     } catch (err) {
         console.log(err.message);
         res.status(500).send('server error');
     }
})

//add comment
router.put('/comment/:id',[auth] ,async(req, res)=>{
     if(!ObjectId.isValid(req.params.id)) 
           return res.status(400).send('Invalid id');
     try {
         const post = await Post.findById(req.params.id);
         if(!post)
            return res.status(404).send('Post not found');
         const { comments } = post;
         const user_id = req.user.id;
         const user = await User.findById(user_id);
         if(!user)
            return res.status(404).send('User not found');
         comments.unshift({
             user: user_id,
             name : user.name,
             avatar: user.avatar,
             text: req.body.text
         });
        
         await post.updateOne({
             comments
         })
         res.status(200).send(post)
         
     } catch (err) {
         console.log(err.message);
         res.status(500).send('server error');
     }
})

//delete comment
router.delete('/comment/:id/:comment_id',[auth] ,async(req, res)=>{
     if(!ObjectId.isValid(req.params.id)) 
           return res.status(400).send('Invalid id');
     try {
         const post = await Post.findById(req.params.id);
         if(!post)
            return res.status(404).send('Post not found');
         const { comments } = post;
         const user_id = req.user.id;
         const { comment_id } = req.params;
         const user = await User.findById(user_id);
         if(!user)
            return res.status(404).send('User not found');
         if(comments.filter(comment => comment.user.toString() === user_id ).length === 0)
            return res.status(400).send('Post already  deleted');
         const index = comments.findIndex(comment => comment._id.toString() === comment_id);
         comments.splice(index,1);
        
         await post.updateOne({
             comments
         })
         res.status(200).send(post)
         
     } catch (err) {
         console.log(err.message);
         res.status(500).send('server error');
     }
})





module.exports = router;