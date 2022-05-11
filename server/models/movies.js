const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorID: String
});

module.exports = mongoose.model('Movie', movieSchema); //model --> collection
//we are creating a collection called 'Movie', and this collection will ovject that looks like the movieSchema & exporting it.
