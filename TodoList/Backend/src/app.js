const express = require("express")
const todoModel = require("./modals/todo.modal")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/todos", async (req, res)=> {
    const {title, description, priority, status} = req.body

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description required",
      });
    }

    const todo = await todoModel.create({
        title, description, priority, status
    })

    res.status(201).json({
        message: "Todo Created Successfully",
        todo
    })
    // console.log(req.body);
})

app.get("/todos", async (req, res)=> {
    const todos = await todoModel.find()

    res.status(200).json({
        message: "Todos Fetched Successfully",
        todos
    })
})

app.delete("/todos/:id", async (req, res)=> {
    const index = req.params.id;
    await todoModel.findByIdAndDelete(index)
    res.status(200).json({
        message: "Todo Deleted Successfully"
    })
})

app.put("/todos/:id", async (req, res)=> {
    const id = req.params.id
    const {title, description, priority, status} = req.body

    await todoModel.findByIdAndUpdate(id, {title, description, priority, status})
    res.status(200).json({
         message: "Todo Updated Successfully"
    })
})

// app.use("*name", (req, res)=> {
//     res.sendFile(path.join(__dirname, "..", "/public/index.html"))
// })

module.exports = app