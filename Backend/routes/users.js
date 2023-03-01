const router=require('express').Router();
let user=require('../models/user.model');

router.route('/').get((req,res)=>{
    user.find() //.find() returns a promise
        .then(users=>res.json(users))
        .catch(err=>res.status(404).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const username=req.body.username;
    const newUser=new user({username});

    newUser.save() //returns a promise
        .then(()=>res.json('User added!'))
        .catch(err=>res.status(404).json('Error:'+err));
});

module.exports=router;