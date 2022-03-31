var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LandscapesSchema = new Schema({
    name: {type: String},
    detail: {
        type: String
    }
})

// export model
module.exports = mongoose.model('Landscapes', LandscapesSchema)