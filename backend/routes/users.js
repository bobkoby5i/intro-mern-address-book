const express = require('express');
const cors = require('cors')
const router = express.Router();
const {check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // for ./config/default.json
const JWT_SECRET = process.env.MERN_ADDRESS_BOOK_JWT_SECRET || config.get("JWT_SECRET"); // read from ./config/default.json
const JWT_EXPIRE = config.get("JWT_EXPIRE");


const User = require('../models/User')

// read ['http://localhost:3001','https://koby5i-mern-address-book-fe.herokuapp.com/','https://koby5i-mern-address-book.herokuapp.com/'] from:
// ./config/default.json
// ./config/production.json
const CORS_ORIGIN = config.get("CORS_ORIGIN");
console.log("/user CORS:", CORS_ORIGIN);


let corsOptions = {
    origin: CORS_ORIGIN,
    methods: "POST",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


// @route GET api/users/hello
router.get("/hello", cors(corsOptions), async (req, res) => {
    console.log("GET /api/users/hello in users.js")
    res.json({msg: 'Welcome to address book API /api/users/hello'})        
});


// @route    POST api/users
// @desc     Register a user
// @access   Public


router.options("/", cors(corsOptions)) //// enable pre-flight request for POST 
router.post("/", cors(corsOptions), [
        check('name', 'Please enter name.').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 3 or more characters').isLength({min:3}),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        console.log("POST /api/users in users.js")
        //console.log(req.body)
        const {name, email, password} = req.body;
        console.log(`Received {name: ${name}  email: ${email} password: ****}`)
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
                expiresIn: JWT_EXPIRE // 3600 = 1h
            }, (err,token) => {
                if (err) throw err;
                return res.status(201).json({ token })
            })
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Backend server error.");
        }

    }
);

module.exports = router;
