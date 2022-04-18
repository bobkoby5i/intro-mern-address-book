const express = require('express')
const router = express.Router();

router.get("/hello", async (req, res) => {
    console.log("GET /api/contacs/hello in contacs.js")
    res.json({msg: 'Welcome to address book API /api/contacs/hello'})        
});


// @route    GET api/contacts
// @desc     Get all users conatcs 
// @access   Private
router.get("/", async (req, res) => {
    console.log("GET /api/contacts in contacs.js")
    const response_body = []
    res.status(200).json(response_body)     
});



// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post("/", async (req, res) => {
    console.log("GET /api/contacts in contacs.js")
    const first_name = req.body.first_name
    const last_name  = req.body.last_name       
    const response_body = {
        id              : "id",
        first_name      : first_name, 
        last_name       : last_name, 
    }       
    res.status(201).json(response_body)      
});

// @route    PUT api/contacts/{id}
// @desc     Update new contact
// @access   Private
router.put("/:id", async (req, res) => {
    console.log("PUT /api/contacts in contacs.js")
    const id         = req.params.id
    const first_name = req.body.first_name
    const last_name  = req.body.last_name       
    const response_body = {
        id              : id,
        first_name      : first_name, 
        last_name       : last_name, 
    }       
    res.status(200).json(response_body)       
});

// @route    PUT api/contacts/{id}
// @desc     Update new contact
// @access   Private
router.delete("/:id", async (req, res) => {
    console.log("PUT /api/contacts in contacs.js")
    const id         = req.params.id
    const first_name = req.body.first_name
    const last_name  = req.body.last_name       
    res.status(200).json({message: "contact deleted"})       
});
 
module.exports = router;
