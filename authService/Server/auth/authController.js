const auth = require('./auth');


exports.signin = function(req,res,next){
    var token = auth.signin(req.user._id);
    res.json({token : token});
}