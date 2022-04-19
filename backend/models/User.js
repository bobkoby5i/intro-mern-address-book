const mongoose = require ('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    registrationDate: {
        type: Date, 
        defaultd: Date.now
    },
});


module.exports = mongoose.model('User', UserSchema);