const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookie = require("cookie-parser")

async function userRegister(req, res) {
    try {
        const { username, email, password, role } = req.body

        const isUserAlreadyExist = await userModel.findOne({ email })
        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: "user already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
            role
        })

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        res.cookie("token", token)

        return res.status(201).json({
            message: "user register successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function userLogin(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
        return res.status(400).json({
            message: "Invalid email and password"
        })
    }

    const token = jwt.sign({
        userId: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

    res.cookie("token", token)

    return res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            role: user.role
        },
        token
    })
}

async function getMe(req, res) {
    try {
        // middleware ne 'userId' ko req.user mein pehle hi decode karke rakha hai
        const user = await userModel.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token")

        return res.status(200).json({
            success: true,
            message: "Logged out successfully! See you soon."
        });
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    userRegister,
    userLogin,
    getMe,
    logoutUser
}