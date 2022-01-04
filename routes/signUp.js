const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
const User = require('../models/usrSchema')
const bcrypt = require('bcryptjs')

router.get('/', function(req, res) {
    res.send('get handler for signup route');
});

router.post('/', async(req,res) => {
    try{
        console.log("username: ",req.body.email);
        console.log("password: ",req.body.password);
        const errors = []
        const email = req.body.email
        let user = await User.findOne({email});
        if(user){  
            console.log(user)
            const message = "duplicate user, an account has already been made with these details"
            console.log("duplicate user");
            return res.status(400).json({error:'user already exists', message:message});
        }
        console.log('email: ', req.body.email);
        console.log('pw: ', req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        user = new User({
            email:req.body.email,
            password:hashedPassword,
            date: Date.now().toString()
        })

        await user.save();
        res.status(200).json({msg:"works"})
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router