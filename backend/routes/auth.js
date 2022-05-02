const express = require('express')
const cors = require('cors')
const router = express.Router();
const User = require('../models/User')
const {check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // for ./config/default.json
const JWT_SECRET = process.env.MERN_ADDRESS_BOOK_JWT_SECRET || config.get("JWT_SECRET"); // read from ./config/default.json
const JWT_EXPIRE = config.get("JWT_EXPIRE");
const verifyTokenJWT = require('../middleware/auth-verifytoken')
const myCors = require('../middleware/cors-config');


// read ['http://localhost:3001','https://koby5i-mern-address-book-fe.herokuapp.com/','https://koby5i-mern-address-book.herokuapp.com/'] from:
// ./config/default.json
// ./config/production.json
//const CORS_ORIGIN = config.get("CORS_ORIGIN");
//console.log("/auth CORS:", CORS_ORIGIN);

//   let corsOptions = {
//     //origin: ['http://localhost:3001','https://koby5i-mern-address-book-fe.herokuapp.com/','https://koby5i-mern-address-book.herokuapp.com/'],
//     origin: CORS_ORIGIN,
//     methods: "POST,GET",
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
  
router.options("/", myCors.corsPreFlightOptionsAuth) //// enable pre-flight request for POST   
router.options("/*", myCors.corsPreFlightOptionsAuth) //// enable pre-flight request for POST   

router.get("/hello", myCors.corsPreFlightOptionsAuth, async (req, res) => {
    console.log("GET /api/auth/hello in auth.js")
    res.json({msg: 'Welcome to address book API /api/auth/hello'})        
});



// @function het user data
// @route    GET /api/auth/id
// @desc     Get logged in user
// @access   Private
router.get("/:id", myCors.corsOptions, verifyTokenJWT, async (req, res) => {
    const user_id = req.params.id
    console.log(`GET /api/auth/${user_id}. JWT id: ${req.user.id}`)
    if (user_id!==req.user.id) {
        return res.status(401).json({msg: `User ${req.user.id} not authorised to fetch ${user_id} MongoDB.` })
    }
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(400).json({msg: `User ${req.user.id} not found in MongoDB.`})
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");              
    }
});


// @function het user data
// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", myCors.corsOptions, verifyTokenJWT, async (req, res) => {
    console.log("GET /api/auth in auth.js", req.user.id)
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(400).json({msg: `User ${req.user.id} not found in MongoDB.`})
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");              
    }
});


// @Function login
// @route    POST api/auth
// @desc     Auth user and get token
// @access   Public
router.post("/", myCors.corsOptions, [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ], 
    async (req, res) => {
        console.log("POST /api/auth in auth.js")
        //console.log(req.body);

        // validate params or exist
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }        
        const {email, password} = req.body;
        console.log(`Received {email: ${email} password: ****}`)

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
