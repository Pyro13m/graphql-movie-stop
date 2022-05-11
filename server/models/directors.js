const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: String,
    age: Number,
});

module.exports = mongoose.model('Director', directorSchema); //model --> collection
//we are creating a collection called 'Director', and this collection will ovject that looks like the directorSchema & exporting it.
