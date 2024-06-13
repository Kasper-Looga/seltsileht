const mongoose = require("mongoose")

const textSchema = mongoose.Schema({
    content: String,
})

const Text = mongoose.Schema("tekst", textSchema);

module.exports = Text;