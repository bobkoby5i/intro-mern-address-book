const express = require('express')
const router = express.Router();
const {check, validationResult } = require('express-validator/check');

const User = require('../models/User')

// @route GET api/users/hello
router.get("/hello", async (req, res) => {
    console.log("GET /api/users/hello in users.js")
    try {
        res.json({msg: 'Welcome to address book API /api/users/hello'})        
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});


// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post("/", [
        check('name', 'Please enter name.').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be  6 or more characters').isLength({min:6}),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        console.log("POST /api/users in users.js")
        console.log(req.body)
        const {email, password} = req.body
        console.log(`email ${email} password ${password}`)
        res.status(201).send("User registered sucessfuly. ");
    }
);

module.exports = router;
