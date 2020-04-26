var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var colorSchema = new Schema({
    color : {
        type: String,
        required : true
    }
});



exports.color = mongoose.model('color',colorSchema);