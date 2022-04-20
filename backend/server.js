const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect Databse
connectDB();

const server = express();

// Init middleware to parse json i requests
//server.use(bodyParser.json())
//server.use(express.json());
//server.use(express.urlencoded({extended: false}));
server.use(express.json({extended: false})); // use querystring library

server.get('/',(req, res) => res.json({msg: 'Welcome to address book API'}));

server.get('/hello', function(req, res){
    console.log('GET /hello');    
    res.send('Hello from Server')
})


// define routs
server.use('/api/users', require('./routes/users'));
server.use('/api/contacts', require('./routes/contacts'));
server.use('/api/auth', require('./routes/auth'));

server.listen(PORT, () => {console.log(`server started on port ${PORT}`)})
// server.listen(PORT, console.log(`server started on port ${PORT}`))  <- co za roznica ? !