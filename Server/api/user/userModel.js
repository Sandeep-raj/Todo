var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
});

userSchema.pre('save',function(next){
    if (!this.isModified('password')) return next();

    this.password = this.hashPassword(this.password);
    next();
});

userSchema.methods = {
    authenticate : function(plaintextpassword){
        return bcrypt.compareSync(plaintextpassword,this.password);
    },
    hashPassword : function(plaintextpassword){
        if(!plaintextpassword)
            return '';
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plaintextpassword,salt);
    }
}


exports.user = mongoose.model('user',userSchema);