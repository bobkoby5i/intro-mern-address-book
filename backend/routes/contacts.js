const express = require('express');
const cors = require('cors')
const router = express.Router();
const {check, validationResult } = require('express-validator');
const verifyTokenJWT = require('../middleware/auth-verifytoken');
const config = require('config'); // for ./config/default.json
const Contact = require('../models/Contact');
const User    = require('../models/User');


router.get("/hello", async (req, res) => {
    console.log("GET /api/contacs/hello in contacs.js")
    res.json({msg: 'Welcome to address book API /api/contacs/hello'})        
});

const CORS_ORIGIN = config.get("CORS_ORIGIN");
console.log("/contacts CORS:", CORS_ORIGIN);

let corsOptions = {
    origin: CORS_ORIGIN,
    methods: "POST,GET,PUT,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


router.options("/", cors(corsOptions)) //// enable pre-flight request for POST   
router.options("/*", cors(corsOptions)) //// enable pre-flight request for POST   

// @route    GET api/contacts
// @desc     Get all users conatcs 
// @access   Private
router.get("/", cors(corsOptions), verifyTokenJWT, async (req, res) => {
    console.log("GET /api/contacts in contacs.js");

    try {
        const contacts = await Contact.find({user: req.user.id}).sort({createdAt:-1});
        res.json(contacts);

    } catch (err) {
        conaole.log(err.message);
        res.status(500).send('Server Error')
    }
});



// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post("/", cors(corsOptions), [verifyTokenJWT, [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
    ]], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }        
        console.log("POST /api/contacts in contacs.js", req.body)
        const {name, email, phone, type} = req.body;
        try {
            const contact = new Contact({
                user: req.user.id,
                name,
                email,
                phone, 
                type
            });
            await contact.save();
            res.status(201).json(contact)      
                
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Backend server error.");
        }

    }       
);

// @route    PUT api/contacts/{id}
// @desc     Update existing contact
// @access   Private
router.put("/:id", cors(corsOptions), verifyTokenJWT,  
    async (req, res) => {
    console.log("contacs.js: PUT /api/contacts/"+req.params.id);

    const {name, email, phone, type} = req.body;
    const contactUpdate = {};
    if (name) contactUpdate.name  = name;
    if (email) contactUpdate.email = email;
    if (phone) contactUpdate.phone = phone;
    if (type) contactUpdate.type  = type;

    try {
        
        let contact = await Contact.findById(req.params.id); 
        if (!contact) return res.status(404).json({msg:"Contact not found."});
        if (contact.user.toString() !== req.user.id) return res.status(401).json({msg:"Not authorized to modify contact."});

        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactUpdate }, {new: true});
        res.status(200).json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:"Server error."});
    }
});

// @route    DELETE api/contacts/{id}
// @desc     DELETE exising contact
// @access   Private
router.delete("/:id",cors(corsOptions), verifyTokenJWT, async (req, res) => {
    console.log("contacts.js: DELETE /api/contacts")

    try {
        let contact = await Contact.findById(req.params.id); 
        if (!contact) return res.status(404).json({msg:"Contact not found."});
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg:"Not authorized to delete contact."});
        }
        console.log(contact)
        console.log(contact.user)
        console.log(contact.email)
        console.log(contact.readOnly)
        if (contact.readOnly) {
            return res.status(409).json({msg:"This contact can not be deleted."});
        }

        //await Contact.deleteOne({ _id: req.params.id });
        await Contact.findByIdAndRemove( req.params.id );
        res.status(200).json({msg: "Contact has been deleted."})          
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:"Server error."});
    }    
});
 
module.exports = router;

