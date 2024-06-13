const mongoose = require("mongoose")
const {Schema} = mongoose;

const textSchema = new Schema({
    _id: String,
    tekst: String,
})

const Text = mongoose.Schema("tekst", textSchema);

module.exports = Text;