const {user} = require('./userModel');

exports.param = function(req,res,next,id){
    user.findById(id,function(err,result){
        if(!err){
            req.user = result;
            next();
        }else{
            next(err);
        }
    });
}

exports.get = function(req,res,next){
    user.find({},function(err,result){
        if(!err){
            res.json(result);
        }else{
            next(err);
        }
    });
}

exports.getOne = function(req,res,next){
    var userObj = req.user;
    res.json(userObj);
}

exports.post = function(req,res,next){
    var userObj = req.body;
    user.create(userObj).then(function(obj){
        res.json(obj);
    }, function(err){
        next(err);
    });
}

exports.put = function(req,res,next){
    var userObj = req.user;
    var obj = req.body;

    userObj.name = obj.username;
    userObj.email = obj.email;
    userObj.password = obj.password;
    
    userObj.save(function(err,result){
        if(!err){
            res.json(result);
        }else{
            next(err);
        }
    });
}