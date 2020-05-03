var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var labelSchema = new Schema({
    tag : {
        type : String,
        required : true
    }
});


exports.label = mongoose.model('label',labelSchema);