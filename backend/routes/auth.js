const express = require('express')
const router = express.Router();


router.get("/hello", async (req, res) => {
    console.log("GET /api/auth/hello in auth.js")
    res.json({msg: 'Welcome to address book API /api/auth/hello'})        
});


// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", async (req, res) => {
    console.log("GET /api/auth in auth.js")
    res.send("GET logged user");
});

// @route    POST api/auth
// @desc     Auth user and get token
// @access   Public
router.post("/", async (req, res) => {
    console.log("POST /api/auth in auth.js")
    console.log(req.body)
    const p_email = req.body.email
    const p_pass  = req.body.password   
    console.log(`received email ${p_email} password ${p_pass}. user OK`)
    if (p_pass !== 'password') {
        console.log('Auth failed: wrong password');
        return res.status(401).json({message:"Auth failed: wrong password."}) 
    } else {
        const response_body = {
            token      : "token", 
            expiresIn  : "JWT_EXPIRES_IN", 
            email      : "fetcheduser.email",                
            isAdmin    : "fetcheduser.isAdmin"
        }            
        res.status(200).json(response_body) 
    }
});



module.exports = router;
