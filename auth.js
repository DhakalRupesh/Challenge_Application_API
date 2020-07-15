const jwt = require('jsonwebtoken');
const User = require('./model/user');
const dotenv = require('dotenv').config();

module.exports.verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if(!authHeader){
        let err = new Error("Bearer token is not set!");
        res.setHeader("WWW-Authenticate", "Bearer")
        err.status = 401;
        return next(err);
    }
    
    let token = authHeader.split(' ')[1];
    let data;

    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }

    User.findById(data._id)
    .then((user)=>{
        req.user = user;
        next();
    })
}

module.exports.verifyAdmin = (req, res, next) => {
    if (!req.user) {
        let err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }
    if (req.user.utype !== true) {
        let err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    next();
}