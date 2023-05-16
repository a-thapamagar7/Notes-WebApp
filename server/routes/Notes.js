const express = require("express")
const Note = require("../models/notes.model")
const router = express.Router()


router.post("/notes/create", async (req, res) => {
    const { note } = req.body
    if (!note)
        return res.json({ status: "error", message: "Required field is empty" })
    try {
        await Note.create({
            title: req.body.title,
            note: req.body.note
        })
        return res.json({ status: "success", message: "The note has been added" })
    } catch (err) {
        return res.json({ status: "error", message: "There was an error" })
    }
})

router.get("/getnotes", async (req, res) => {
    try {
        const note = await Note.find({})
        return res.json({ status: "success", data: note })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getnotes/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findById(id)
        return res.json({ status: "success", message: "data_found", data: note })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.delete("/notes/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findByIdAndDelete(id)
        return res.json({ status: "success", message: "The note has been deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.patch("/notes/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "The note has been updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})


module.exports = router