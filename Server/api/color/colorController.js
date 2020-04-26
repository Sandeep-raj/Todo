const {color} = require('./colorModel');

exports.params = function(req,res,next,id){
    color.findById(id,function(err,result){
        if(!err){
            req.color = result;
            next();
        }else{
            next(err);
        }
    });
}

exports.get = function(req,res,next){
    color.find({},function(err,result){
        if(!err){
            res.json(result);
        }else{
            next(err);
        }
    });
}

exports.getOne = function(req,res,next){
    var colorObj = req.color;
    res.json(colorObj);
}

exports.post = function(req,res,next){
    var colorObj = req.body;
    color.create(colorObj).then(function(obj){
        res.json(obj);
    }, function(err){
        next(err);
    });
}

exports.put = function(req,res,next){
    var colorObj = req.color;
    var obj = req.body;
    colorObj.color = obj.color;
    colorObj.save(function(err,result){
        if(!err){
            res.json(result);
        }else{
            next(err);
        }
    });
}