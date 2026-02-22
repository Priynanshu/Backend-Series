const express = require("express")
const taskController = require("../controllers/task.controller")
const identifyUser = require("../middlewares/userAuthenticate")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post("/create-task", identifyUser, upload.single("coverImage"), taskController.createTask)
router.put("/edit-task/:taskId", identifyUser, upload.single("coverImage"), taskController.editTask)
router.delete("/delete-task/:taskId", identifyUser, taskController.deleteTask)
router.get("/tasks", identifyUser, taskController.fetchTasks)
router.get("/", taskController.getAllTasks)

module.exports = router