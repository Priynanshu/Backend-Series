const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const note = []

app.post('/notes', (req, res) => {
    console.log(req.body)
    note.push(req.body)
  res.send('Hello World!')
})

app.get("/notes", (req, res)=> {
    res.send(note)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
