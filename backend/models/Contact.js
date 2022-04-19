const mongoose = require ('mongoose')

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
    },
    phone: {
        type: String, 
    },    
    type: {
        type: String, 
        default: 'personal'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, { collection: 'contacts' });


module.exports = mongoose.model('Contact', ContactSchema);