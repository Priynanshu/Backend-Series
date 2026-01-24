const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.get("/", (req, res)=> {
    res.send("Hello World")
})

app.post("/notes", (req, res)=> {
    notes.push(req.body)
    res.send(req.body)
})

app.get("/notes", (req, res)=> {
    res.send(notes)
})

app.delete("/notes/:index", (req, res)=> {
    delete notes[req.params.index]
    res.send("note deleted succussefuly")
})

app.patch("/notes/:index", (req, res)=> {
    notes[req.params.index].description = req.body.description
    console.log("descritption updated succussesfully")
})

module.exports = app