const express = require("express")
const noteModel = require("./modals/note.modal")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/notes", async (req, res)=> {
    const {title, description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note Created Succesfully",
        note
    })
})

app.get("/notes", async (req, res)=> {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Note Fetched Successfully",
        notes
    })
})

app.delete("/notes/:id", async (req, res)=> {
    const index = req.params.id;
    await noteModel.findByIdAndDelete(index)
    res.status(200).json({
        message: "Note Deleted Successfully"
    })
})

app.patch("/notes/:id", async (req, res)=> {
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})
    res.status(200).json({
         message: "Note Updated Successfully"
    })
})

module.exports = app