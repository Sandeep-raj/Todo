const {todo} = require('./todoModel');

exports.param = function(req,res,next,id){
    todo.findById(id)
    .populate('contributors labels color')
    .exec()
    .then(function(result){
        console.log(result);
        req.todo = result;
        next();
    },function(err){
        next(err);
    });
}

exports.get = function(req,res,next){
    todo.find({})
    .populate('contributors labels color')
    .exec()
    .then(function(result){
        res.json(result);
    },function(err){
        next(err);
    });
}

exports.getOne = function(req,res,next){
    var todoObj = req.todo;
    console.log(todoObj);
    res.json(todoObj);
}

exports.post = function(req,res,next){
    var todoObj = req.body;
    todo.create(todoObj).then(function(obj){
        res.json(obj);
    }, function(err){
        next(err);
    });
}

exports.put = function(req,res,next){
    var todoObj = req.todo;
    var obj = req.body;

    todoObj.title = obj.title;
    todoObj.contributors = obj.contributors;
    todoObj.labels = obj.labels;
    todoObj.isPinned = obj.isPinned;
    todoObj.color = obj.color;
    todoObj.listItem = obj.listItem;

    todoObj.save(function(err,result){
        if(!err){
            res.json(result);
        }else{
            next(err);
        }
    });
}