const foodModel = require("../models/food.models")
const likeModel = require("../models/likes.models")
const saveModel = require("../models/save.models")
const storageServices = require("../services/storage.services")
const { v4: uuid } = require("uuid")

async function createFood(req, res) {
    console.log(req.foodPartner)
    try {
        const uniqueFileName = uuid() + "-" + req.file.originalname;

        const imageUrl = await storageServices.uploadFile(
            req.file.buffer,
            uniqueFileName
        );

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: imageUrl.url,
            foodPartner: req.foodPartner._id
        })

        return res.status(201).json({
            message: "Food Item Created Successfully",
            food: foodItem
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function getFoodItem(req, res) {
    try {
        const foodItems = await foodModel.findOne({})

        if (!foodItems) {
            return res.status(404).json({
                message: "FoodItems are not food"
            })
        }

        return res.status(200).json({
            message: "FoodItems Fetched successfully",
            foodItems
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function likeFoodItem(req, res) {
    try {
        const { foodId } = req.body
        const userId = req.user._id

        if (!foodId) {
            return res.status(400).json({ message: "Food ID missing" })
        }

        const isAlreadyLiked = await likeModel.findOne({
            user: userId,
            food: foodId
        })

        if (isAlreadyLiked) {
            await likeModel.deleteOne({
                user: userId,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })

            return res.status(200).json({
                like: false,
                message: "Food unliked"
            })
        }

        await likeModel.create({
            user: userId,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })

        return res.status(200).json({
            like: true,
            message: "Food liked"
        })

    } catch (err) {
        console.log("LIKE ERROR:", err)
        return res.status(500).json({
            message: err.message
        })
    }
}

async function saveFood(req, res) {
    try {
        const { foodId } = req.body
        const userId = req.user._id

        if (!foodId) {
            return res.status(400).json({ message: "Food ID missing" })
        }

        const isAlreadySaved = await saveModel.findOne({
            user: userId,
            food: foodId
        })

        if (isAlreadySaved) {
            await saveModel.deleteOne({
                user: userId,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            })

            return res.status(200).json({
                save: false,
                message: "Food unsaved"
            })
        }

        await saveModel.create({
            user: userId,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        })

        return res.status(200).json({
            save: true,
            message: "Food saved"
        })

    } catch (err) {
        console.log("SAVE ERROR:", err)
        return res.status(500).json({
            message: err.message
        })
    }
}

async function getSaveFood(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "User not logged in"
            })
        }

        const userId = req.user._id

        const savedFoods = await saveModel
            .find({ user: userId })
            .populate("food")

        return res.status(200).json({
            message: "Saved foods fetched successfully",
            savedFoods
        })

    } catch (err) {
        console.log("GET SAVE ERROR:", err)
        return res.status(500).json({
            message: err.message
        })
    }
}
module.exports = { createFood, getFoodItem, likeFoodItem, saveFood, getSaveFood }