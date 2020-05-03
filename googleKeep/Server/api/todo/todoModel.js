var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    contributors : [
        { type : Schema.Types.ObjectId}
    ],

    labels : [{type : Schema.Types.ObjectId, ref : 'label'}],

    isPinned : {
        type : Boolean,
        required : true,
        default : false
    },

    color : {
        type : Schema.Types.ObjectId,
        ref : 'color'
    },

    listItem : [{
        item : {
            type : String
        },
        completed : {
            type: Boolean,
            default : false
        }
    }]

});

exports.todo = mongoose.model('todo',todoSchema);