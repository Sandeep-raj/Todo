const {label} = require('./labelModel');


exports.params = function(req,res,next,id){
    label.findById(id,function(err,result){
        if(!err){
            req.label = result;
            next();
        }else{
            next(err);
        }
    });
}

exports.get = function(req,res,next){
    label.find({},function(err,result){
        if(!err){
            res.json(result);
        }else{
            next(err);
        }
    });
}

exports.getOne = function(req,res,next){
    var labelObj = req.label;
    res.json(labelObj);
}

exports.post = function(req,res,next){
    var labelObj = req.body;
    label.create(labelObj).then(function(obj){
        res.json(obj);
    }, function(err){
        next(err);
    });
}

exports.put = function(req,res,next){
    var labelObj = req.label;
    var obj = req.body;
    labelObj.tag = obj.tag;
    labelObj.save(function(err,result){
        if(!err){
            res.json(result);
        }else{
            next(err);
        }
    });
}