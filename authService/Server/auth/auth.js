const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {user} = require('./user/userModel');

exports.decodeToken = function(req,res,next){
    if (req.headers.authorization !== undefined) {
        var bearerToken = req.headers.authorization.split(' ')[1];
        jwt.verify(bearerToken,config.secrets.jwt, (err,result) => {
            if(!err){
                req.user = result;
                next();
            }else{
                res.status(403).send('Forbidden : Client doesnt have the rights to access this site ');
            }
        })
    }else{
        res.status(401).send('Authentiaction Error : No token found in header');
    }
}

exports.getUser = function(req,res,next){
    user.findById(req.user._id).then(
        function(result){
            if(!result){
                res.status(401).send('Unauthorized - Invalid User Detail');
            }else{
                // req.user = result;
                // next();
                res.status(200).send(result);
            }
        },
        function(err){
            next(err);
        }
    )
}

exports.verifyUser = function(req,res,next){
    console.log('Hit');
    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password){
        res.status(400).send("Invalid Username or Password");
    }

    user.findOne({username : username}).then(
        function(result){
            if(result.authenticate(password)){
                req.user = result;
                next();
            }else{
                res.status(401).send('Wrong password');
            }
        },
        function(err){
            next(err);
        }
    );
}

exports.signin = function(id){
    return jwt.sign(
        {
            _id : id
        },
        config.secrets.jwt,
        {expiresIn: config.expireTime}
    );
}