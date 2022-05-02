const config = require('config'); // for ./config/default.json


// read ['http://localhost:3001','https://koby5i-mern-address-book-fe.herokuapp.com/','https://koby5i-mern-address-book.herokuapp.com/'] from:
// ./config/default.json
// ./config/production.json
const CORS_ORIGIN = config.get("CORS_ORIGIN");
const CORS_ORIGIN_ARR = config.get("CORS_ORIGIN_ARR");
console.log("CORS:", CORS_ORIGIN);
console.log("CORS:", CORS_ORIGIN_ARR);




  const allowlist = ['http://example1.com', 'http://example2.com']
  const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (CORS_ORIGIN_ARR.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: req.header('Origin') } // reflect (enable) the requested origin in the CORS response
      console.log(corsOptions)
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }  



 const MY_CORS= {
    origin  : CORS_ORIGIN_ARR, // ["www.one.com","www.two.com","http://localhost:3000"],
    default : CORS_ORIGIN
 }

const corsOptions = (req, res, next) => {
    const origin = MY_CORS.origin.includes(req.header('origin')?.toLowerCase()) ? req.headers.origin : MY_CORS.default;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}  

const corsPreFlightOptionsContacts = (req, res, next) => {
    const origin = MY_CORS.origin.includes(req.header('origin')?.toLowerCase()) ? req.headers.origin : MY_CORS.default;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "authorization, content-type");
    next();
}  

const corsPreFlightOptionsAuth = (req, res, next) => {
    const origin = MY_CORS.origin.includes(req.header('origin')?.toLowerCase()) ? req.headers.origin : MY_CORS.default;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Headers", "authorization, content-type");
    next();
}  

const corsPreFlightOptionsUser = (req, res, next) => {
    const origin = MY_CORS.origin.includes(req.header('origin')?.toLowerCase()) ? req.headers.origin : MY_CORS.default;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "authorization, content-type");
    next();
}  




let corsOptionsPreFlight = {
    origin: "http://localhost:3001",
    methods: "POST,GET,PUT,DELETE",
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


module.exports = { corsOptions, corsPreFlightOptionsContacts,corsPreFlightOptionsAuth, corsPreFlightOptionsUser };