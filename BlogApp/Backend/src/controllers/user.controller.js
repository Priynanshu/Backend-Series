const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const sessionModel = require("../models/session.models")
const fs = require("fs")
const path = require("path")

async function register(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Require"
            })
        }

        
    let profileImage

    // 👇 If user uploads image
    if (req.file) {
      profileImage = req.file.filename
    } else {
      // 👇 Default random image from uploads folder
      const uploadPath = path.join(__dirname, "../uploads")
      const images = fs.readdirSync(uploadPath)

      // Sirf image files filter karo
      const imageFiles = images.filter(file =>
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png")
      )

      profileImage =
        imageFiles[Math.floor(Math.random() * imageFiles.length)]
    }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Password atleast greater than 6 character"
            })
        }

        const isUserAlreadyExist = await userModel.findOne({ email })
        if (isUserAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            profileImage
        })

        const token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" })

        user.token = token
        await user.save()

        // Frontend ke liye full image URL construct karo
        const userResponse = user.toObject()
        userResponse.profileImage = `http://localhost:3000/uploads/${user.profileImage}`

        return res.status(200).json({
            success: true,
            message: "user register successfully",
            user: userResponse,
            token
        })
    } catch (err) {
        console.log("Error from user registration: ", err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Require"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        await sessionModel.deleteOne({ userId: user._id })
        await sessionModel.create({ userId: user._id })

        const accessToken = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" })

        const refrehToken = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })

        user.isVerified = true
        await user.save()

        // Frontend ke liye full image URL construct karo
        const userResponse = user.toObject()
        userResponse.profileImage = `http://localhost:3000/uploads/${user.profileImage}`

        return res.status(200).json({
            success: true,
            message: "user login successfully",
            accessToken,
            refrehToken,
            user: userResponse
        })
    } catch (err) {
        console.log("Erro From user login: ", err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function logout(req, res) {
    try {
        const { userId } = req.params
        await sessionModel.deleteMany({ userId })
        await userModel.findByIdAndUpdate(userId, { isVerified: false })
        return res.status(200).json({
            success: true,
            message: "user loggedOut successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function editUser(req, res) {
    try {
        const {name, email, bio} = req.body
        const {userId} = req.params

        if(!name || !email || !bio) {
            return res.status(400).json({
                success: false,
                message: "Please enter the Inputs"
            })
        }

        const user = await userModel.findByIdAndUpdate(
            userId, 
            {name, email, bio},
            {new: true}
        )

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        // Frontend ke liye full image URL construct karo
        const userResponse = user.toObject()
        userResponse.profileImage = `http://localhost:3000/uploads/${user.profileImage}`

        return res.status(200).json({
            success: true,
            message: "Profile Edited Successfully",
            user: userResponse
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { register, login, logout, editUser }