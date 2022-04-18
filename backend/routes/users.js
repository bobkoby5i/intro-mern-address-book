const express = require('express')
const router = express.Router();

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
router.post("/", async (req, res) => {
    console.log("POST /api/users in users.js")
    console.log(req.body)
    const p_email = req.body.email
    const p_pass  = req.body.password    
    console.log(`email ${p_email} password ${p_pass}`)
    res.send("User registered");
});

module.exports = router;
