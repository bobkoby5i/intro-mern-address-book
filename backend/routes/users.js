const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // for ./config/default.json
const JWT_SECRET = process.env.MERN_ADDRESS_BOOK_JWT_SECRET || config.get("JWT_SECRET"); // read from ./config/default.json


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
        const {name, email, password} = req.body;
        console.log(`email ${name}  email ${email} password ${password}`)
        try {
            let user = await User.findOne({email}); // {email: email}
            if (user) {
                return res.status(400).json({msg: `User ${email} already exists.`})
            }
            user = new User({
                name,
                email,
                password 
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id,
                    email: user.email,
                }
            }

            jwt.sign(payload, JWT_SECRET, {
                expiresIn: 3600, // 1h
            }, (err,token) => {
                if (err) throw err;
                res.josn
                res.status(201).json({ token })
            })

            
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Backend server error.");
        }

    }
);

module.exports = router;
