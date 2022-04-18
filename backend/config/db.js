// Connect to mongo DB
// 1. use MONGO_MERN_ADDRESS_BOOK_URI = "mongodb://localhost:27017/intro-address-book-db"
//    when working on many projects I have:
//    - MONGO_MERN_ADDRESS_BOOK_URI
//    - MONGO_MERN_RENT_A_CAR_URI
// 2. use config and default.json MONGO_URI


const mongoose = require('mongoose');
const config = require('config'); // for ./config/default.json
//const mongo_uri = config.get("MONGO_URI");
// const mongo_uri = process.env.MONGO_MERN_ADDRESS_BOOK_URI || "mongodb://localhost:27017/intro-address-book-db";
const mongo_uri = process.env.MONGO_MERN_ADDRESS_BOOK_URI || config.get("MONGO_URI"); // read from ./config/default.json

console.log(mongo_uri);

const connectDB = async () =>  {
    try {
        await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,  
            // useCreateIndex: true,  
            // useFindandModify: false,  
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB.')
    } catch (err) {
        console.log('Can not connect to MongoDB. Some error.')
        console.log(err.message);
        process.exit(1);
    }      
}


// with then 
//
// const connectDB = () =>  {
//     mongoose
//         .connect(mongo_uri, {
//             useNewUrlParser: true,  
//             // useCreateIndex: true,  
//             // useFindandModify: false,  
//             useUnifiedTopology: true,
//         })
//         .then(() => {console.log('Connected to MongoDB.')})
//         .catch(err => {
//             console.log('Can not connect to MongoDB.')
//             console.log(err.message);
//             process.exit(1);
//         })
// }



module.exports = connectDB;

