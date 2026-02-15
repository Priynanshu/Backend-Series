const userModel = require("../models/user.modals")
const sessionModel = require("../models/session.modals")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { emailVerification } = require("../email/emailVerify")
const sendOtpMail = require("../email/sendOtpMail")

async function registerUser(req, res) {
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

        emailVerification(token, email)
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

async function verification(req, res) {
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

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await userModel.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No User Found"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your account then login"
            });
        }

        await sessionModel.deleteOne({ userId: user._id });
        await sessionModel.create({ userId: user._id });

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "10d" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
        );

        user.isLoggedIn = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.name}`,
            accessToken,
            refreshToken,
            user
        });

    } catch (err) {
        console.log("LOGIN ERROR:", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


async function logoutUser(req, res) {
    try {
        const userId = req.userId
        await sessionModel.deleteMany({userId})
        await userModel.findByIdAndUpdate(userId, {isLoggedIn: false})

        return res.status(200).json({
            success: true,
            message: "User LogOut Successfully"
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
        const { email } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp
        user.otpExpiry = expiry
        await user.save()

        await sendOtpMail(email, otp)

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            userId: user._id
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function verifyOTP(req, res) {
    const { otp } = req.body
    const { id } = req.params

    if (!otp) {
        return res.status(400).json({
            success: false,
            message: "OTP is required"
        })
    }

    try {
        const user = await userModel.findById(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or already verified"
            })
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired. Please request a new OTP"
            })
        }

        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        user.otp = null
        user.otpExpiry = null
        await user.save()

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


async function changePassword(req, res) {
    const { email, newPassword, confirmPassword } = req.body
    const {id} = req.params

    if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        })
    }

    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
            email: user.email,
            userId: user._id
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


module.exports = { registerUser, verification, loginUser, logoutUser, forgotPassword, verifyOTP, changePassword }