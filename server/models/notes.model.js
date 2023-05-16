const mongoose = require("mongoose")

const Notes = new mongoose.Schema({
    title: { type: String },
    note: { type: String, required: true },
}, { collection: "note-data" })

const noteModel = mongoose.model("NoteData", Notes)

module.exports = noteModel