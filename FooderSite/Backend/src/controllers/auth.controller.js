const userModel = require("../models/user.models")
const foodPartnerModel = require("../models/foodpartner.models")
const bcrypt = require("bcrypt")
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
    try {
        const {username, email, password} = req.body

        // if(!username || !email || !password) {
        //     return res.status(400).json({
        //         message: "All Fields Are Require."
        //     })
        // }

        const isUserExist = await userModel.findOne({email})
        if(isUserExist) {
            return res.status(400).json({
                message: "User Already Exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        })

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})

        res.cookie("token", token)

        return res.status(201).json({
            message: "User Register Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function loginUser(req, res) {
    try{
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({
                message: "All Fields are require"
            })
        }

        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(404).json({
                message: "User not Found"
            })
        }

        const verifiidPassword = await bcrypt.compare(password, user.password)
        if(!verifiidPassword) {
          return  res.status(400).json({
                message: "Inavalid Email And Password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})

        res.cookie("token", token)

        return res.status(201).json({
            message: "User Log In successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

function logoutUser(req, res) {
    try{
        res.clearCookie("token")

        return res.status(200).json({
            message: "User Logout Successfully"
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function registerPartner(req, res) {
    try {
        const {username, email, password, contactName, address, phone} = req.body

        // if(!username || !email || !password) {
        //     return res.status(400).json({
        //         message: "All Fields Are Require."
        //     })
        // }

        const isAccountExist = await foodPartnerModel.findOne({email})
        if(isAccountExist) {
            return res.status(400).json({
                message: "User Already Exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const foodPartner = await foodPartnerModel.create({
            username,
            email,
            password: hashPassword,
            contactName,
            phone,
            address
        })

        const token = jwt.sign({
            id: foodPartner._id,
            email: foodPartner.email
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})

        res.cookie("token", token)

        return res.status(201).json({
            message: "User Register Successfully",
            foodPartner: {
                id: foodPartner._id,
                username: foodPartner.username,
                email: foodPartner.email,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone,
                address: foodPartner.address
            },
            token
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function loginPartner(req, res) {
    try{
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({
                message: "All Fields are require"
            })
        }

        const foodPartner = await foodPartnerModel.findOne({email})
        if(!foodPartner) {
            return res.status(404).json({
                message: "User not Found"
            })
        }

        const verifiidPassword = await bcrypt.compare(password, foodPartner.password)
        if(!verifiidPassword) {
          return  res.status(400).json({
                message: "Inavalid Email And Password"
            })
        }

        const token = jwt.sign({
            id: foodPartner._id,
            email: foodPartner.email
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})

        res.cookie("token", token)

        return res.status(201).json({
            message: "User Log In successfully",
            foodPartner: {
                id: foodPartner._id,
                username: foodPartner.username,
                email: foodPartner.email,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone,
                address: foodPartner.address
            },
            token
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

function logoutPartner(req, res) {
    try{
        res.clearCookie("token")

        return res.status(200).json({
            message: "User Logout Successfully"
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {registerUser, loginUser, logoutUser, registerPartner, loginPartner, logoutPartner}