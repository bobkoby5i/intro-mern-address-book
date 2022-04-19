const express = require('express')
const router = express.Router();
const User = require('../models/User')
const {check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // for ./config/default.json
const JWT_SECRET = process.env.MERN_ADDRESS_BOOK_JWT_SECRET || config.get("JWT_SECRET"); // read from ./config/default.json
const JWT_EXPIRE = config.get("JWT_EXPIRE");
const verifyTokenJWT = require('../middleware/auth-verifytoken')





router.get("/hello", async (req, res) => {
    console.log("GET /api/auth/hello in auth.js")
    res.json({msg: 'Welcome to address book API /api/auth/hello'})        
});


// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", verifyTokenJWT, async (req, res) => {
    console.log("GET /api/auth in auth.js")
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(400).json({msg: `User ${req.user.id} not found in Mongo.`})
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Backend server error.");              
    }
});

// @route    POST api/auth
// @desc     Auth user and get token
// @access   Public
router.post("/", [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ], 
    async (req, res) => {
        console.log("POST /api/auth in auth.js")
        console.log(req.body);

        // validate params or exist
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }        
        const {email, password} = req.body;
        console.log(`email: ${email} password: ****`)

        try {
            let user = await User.findOne({email}); // {email: email}
            if (!user) {
                console.log('Auth failed: User not found.');    
                return res.status(401).json({msg: `Auth failed: User ${email} not found.`})
            }

            const isMatch =  await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log('Auth failed: wrong password');
                return res.status(401).json({message:"Auth failed: Password does not match."}) 
            }

            const payload = {
                user: {
                    id: user.id,
                    email: user.email,
                }
            }

            jwt.sign(payload, JWT_SECRET, {
                expiresIn: JWT_EXPIRE // 3600 = 1h
            }, (err,token) => {
                if (err) throw err;
                res.status(200).json({ token })
            })            

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Backend server error.");            
        }
    }
);



module.exports = router;
