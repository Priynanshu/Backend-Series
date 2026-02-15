const userModel = require("../models/user.modals")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { emailVerify } = require("../email/verifyEmail")
const sessionModel = require("../models/session.modals")
const sentOTP = require("../email/sentOTP") 

async function register(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All Fields are required" })
        }

        const isUserExist = await userModel.findOne({
            $or: [
                { name },
                { email }
            ]
        })

        if (isUserExist) {
            return res.status(400).json({ success: false, message: "user already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" })

        emailVerify(token, email)
        user.token = token
        await user.save()

        return res.status(201).json({
            success: true,
            message: "User Register Successfully",
            user,
            token
        })
    } catch (err) {
        return res.status(500).json({ sucess: false, message: err.message })
    }
}


async function verify(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ success: false, message: "Autherizaiton token is missing or Invalid" })
        }

        const token = authHeader.split(" ")[1]

        let decoded;
        try {
             decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch(err) {
           if(err.name === "TokenExpiredError") {
            return res.status(400).json({
                success: false,
                message: "The register token is expired"
            })
           }

           return res.status(400).json({
            success: false,
            message: "Token Verification Failed"
           })
        }

        const user = await userModel.findById(decoded.id)
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.token = null
        user.isVerified = true
        await user.save()

        return res.status(201).json({
            success: true,
            message: "Email verified Successfully"
        })
    } catch (err) {
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
                message: "all fields are require"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }

        const passwordVerify = await bcrypt.compare(password, user.password)
        if (!passwordVerify) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "please verify account then login"
            })
        }

        await sessionModel.deleteOne({ userId: user._id })
        await sessionModel.create({ userId: user._id })

        const accessToken = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" })

        const refreshToken = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })

        user.isLoggedIn = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: `welcome back ${user.name}`,
            accessToken,
            refreshToken,
            user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function logout(req, res) {
    try {
        const userId = req.userId
        await sessionModel.deleteMany({userId})
        await userModel.findByIdAndUpdate(userId, {isLoggedIn: false})

        return res.status(201).json({
            success: true,
            message: "User logged out successfully"
        })

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function forgotPassword(req, res) {
    try {
        const {email} = req.body

        if(!email) {
            return res.status(401).json({
                success: false,
                message: "Please enter the register email"
            })
        }

        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp
        user.otpExpiry = expiry
        await user.save()

        await sentOTP(email, otp)

        return res.status(201).json({
            success: true,
            message: "OTP sent Successfully"
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function verifiengOTP(req, res) {
    const {otp} = req.body
    const {id} = req.params

    if(!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is require"
            })
        }

    try {
        const user = await userModel.findById(id)
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        if(!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "otp is expired or already verified"
            })
        }

        if(user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "otp expired, please generate a new otp"
            })
        }

        if(user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save()

        return res.status(201).json({
            success: true,
            message: "otp verified successfully"
        })
        
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function changePassword(req, res) {
    const {email, newPassword, confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "all fields are require"
        })
    }

    if(newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "password is not match"
        })
    }

    try {
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        return res.status(201).json({
            success: false,
            message: "password changed successfully"
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

module.exports = { register, verify, login, logout, forgotPassword, verifiengOTP, changePassword }