const userModel = require("../models/user.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
require("dotenv").config()

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function register(req, res) {
   try {
    const {username, email, password, profileImg} = req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "All Fields are require"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exist"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        profileImg
    })

    const token = jwt.sign({
        userId: user._id,
        email: user.email
    }, process.env.JWT_SECRET_KEY, {expiresIn: "60m"})

    res.cookie("token", token)

    return res.status(201).json({
        message: "User Register Successfully",
        user: {
            username: user.username,
            email: user.email,
            profileImg: user.profileImg,
            bio: user.bio
        },
        token
    })

   }catch(err) {
    return res.status(500).json({
        message: err.message
    })
   }
}

async function editUser(req, res) {
    try {
            const { username, bio } = req.body;
            const userId = req.params.userId;
    
            const user = await userModel.findById(
                userId
            );
    
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            user.username = username || user.username;
            user.bio = bio || user.bio;
    
            if (req.file) {
                const file = await imagekit.files.upload({
                    file: await toFile(Buffer.from(req.file.buffer), 'file'),
                    fileName: "Users",
                    folder: "TaskManager-Project"
                });
    
                user.profileImg = file.url;
            }
    
            await user.save();
    
            return res.status(200).json({
                message: "user edited successfully",
                user
            });
    
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message
            });
        }
}

async function login(req, res) {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                message: "All Fields are require"
            })
        }

        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const passwordVerify = await bcrypt.compare(password, user.password)
        if(!passwordVerify) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {expiresIn: "60m"})

        res.cookie("token", token)

        return res.status(201).json({
            message: "LogIn Successfully",
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
                profileImg: user.profileImg,
                bio: user.bio
            },
            token
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("token")

        return res.status(201).json({
            message: "Logout successfully"
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {register, login, logout, editUser}