const taskModel = require("../models/task.models")
const userModel = require("../models/user.models")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
require("dotenv").config()

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createTask(req, res) {
    try {
        const {title, description, priority, status, assign, date} = req.body

        if (!title || !description || !date || !req.file) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Tasks",
        folder: "TaskManager-Project"
    })

    const task = await taskModel.create({
        title,
        description,
        date,
        priority,
        status,
        assign,
        coverImage: file.url,
        user: req.user.userId
    })

    return res.status(201).json({
        message: "Task created successfully.",
        task
    })
    }catch(err) {
        console.error(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

async function editTask(req, res) {
    try {
        const { title, description, priority, status, assign, date } = req.body;
        const taskId = req.params.taskId;

        const task = await taskModel.findById(
            taskId
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.assign = assign || task.assign;
        task.date = date || task.date;

        if (req.file) {
            const file = await imagekit.files.upload({
                file: await toFile(Buffer.from(req.file.buffer), 'file'),
                fileName: "Tasks",
                folder: "TaskManager-Project"
            });

            task.coverImage = file.url;
        }

        await task.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
}

async function deleteTask(req, res) {
    try {
        const taskId = req.params.taskId

        await taskModel.findByIdAndDelete(taskId)

        return res.status(201).json({
            message: "Task Deleted Successfully"
        })
        
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function fetchTasks(req, res) {
    try {
        const userId = req.user.userId

        const task = await taskModel.find({user: userId})

        if(!task || task.length === 0) {
            return res.status(400).json({
                message: "There is no task available"
            })
        }

        return res.status(201).json({
            message: "Task fetched successfullly",
            tasks: task
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function getAllTasks(req, res) {
    try {
        // .find({}) ka matlab hai bina kisi filter ke saare tasks lana
        // .populate('user', 'name email') se aap user ki details bhi fetch kar sakte hain
        const tasks = await taskModel.find({}).populate('user', 'username email');

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                message: "No tasks found in the database"
            });
        }

        return res.status(200).json({ // Success ke liye 200 use karna standard hai
            message: "All tasks fetched successfully",
            tasks: tasks
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {createTask, editTask, deleteTask, fetchTasks, getAllTasks}