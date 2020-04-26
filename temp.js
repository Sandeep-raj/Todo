const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {user,label,todo,color} = require('./model');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.param('labelid',function(req,res,next,id){
    label.findById(id,function(err,result){
        req.label = result;
        next();
    });
});

app.post('/api/labels', function(req,res){
    var labelObj = req.body;
    label.create(labelObj).then(function(obj){
        res.json(obj);
    }, function(err){
        console.log(err);
    });
});

app.get('/api/labels',function(req,res){
    label.find({},function(err,result){
        if(!err){
            res.json(result);
        }
    })
});

app.put('/api/labels/:labelid',function(req,res){
    //res.json(req.label);
    var label = req.label;
    var obj = req.body;
    label.tag = obj.tag;
    label.save(function(err,result){
        if(!err){
            res.json(result);
        }
    })
})

app.listen(3000, function(err){
    if(!err){
        console.log('server started');
        require('mongoose').connect('mongodb://localhost/googlekeep',{useNewUrlParser : true});
    }
});