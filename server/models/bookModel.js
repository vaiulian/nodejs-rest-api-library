var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
    title: String,
    author: String,
    year: { type: Number, min: 1, max: 2016 }
});

module.exports = mongoose.model('Book', BookSchema);
