const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect Databse
connectDB();

const server = express();
//Simple Usage (Enable All CORS Requests)
//server.use(cors())

  
// Init middleware to parse json i requests
//server.use(bodyParser.json())
//server.use(express.json());
//server.use(express.urlencoded({extended: false}));
server.use(express.json({extended: false})); // use querystring library

server.get('/',(req, res) => res.json({msg: 'Welcome to address book API'}));

//Enable CORS for a Single Route
let corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

server.get('/hello', cors(corsOptions), function(req, res){
    console.log('GET /hello');    
    res.send({msg:'Hello from Server. This is CORS-enabled for only example.com.'})
})

server.get('/hello/json', cors(corsOptions), function(req, res){
    console.log('GET /hello/json');    
    res.status(200).json({msg: 'Hello from Server. This is CORS-enabled for only http://localhost:3001.' })
})

// define routs
server.use('/api/users', require('./routes/users'));
server.use('/api/contacts', require('./routes/contacts'));
server.use('/api/auth', require('./routes/auth'));

server.listen(PORT, () => {console.log(`server started on port ${PORT}`)})
// server.listen(PORT, console.log(`server started on port ${PORT}`))  <- co za roznica ? !