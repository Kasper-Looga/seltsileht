const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    tekst: String
});

module.exports = mongoose.model("Data", dataSchema);