// check if token is in header and valid
const jwt = require('jsonwebtoken');
const config = require('config'); // for ./config/default.json
const JWT_SECRET = process.env.MERN_ADDRESS_BOOK_JWT_SECRET || config.get("JWT_SECRET"); // read from ./config/default.json

function verifyTokenJWTXAuth(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    //check if exist 
    if (!token) {
        return res.status(401).json({msg:"Missing token, Authorization denied."});
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        //req.isAdmin = payload.isAdmin;
        next();
    } catch (err) {
        res.status(401).json({msg:"Token is not valid"});
    }
}

function verifyTokenJWTBearer(req, res, next) {
    // get token from header

    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request. No authorization header.");
    }
    let token = req.headers.authorization.split(' ')[1]; // Bearer xx.yy.zz    

    //check if found
    if (!token) {
        return res.status(401).json({msg:"Missing token, Authorization denied."});
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        //req.isAdmin = payload.isAdmin;
        next();
    } catch (err) {
        res.status(401).json({msg:"Token is not valid"});
    }
}



module.exports = verifyTokenJWTBearer;