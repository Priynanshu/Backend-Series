const userModel = require('../models/user.models')
const followModel = require("../models/follow.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
    const { email, username, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409)
            .json({
                message: "User already exists " + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
            })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User Registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })


}

async function loginController(req, res) {
    try {
        const { username, email, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        }).select("+password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "password invalid"
            })
        }

        // 🔥 Followers fetch start (Login logic ko disturb nahi karega)

        const followersList = await followModel.find({
            followee: user.username,
            status: "accepted"
        })

        const followerUsernames = followersList.map(f => f.follower)

        const followersData = await userModel.find({
            username: { $in: followerUsernames }
        }).select("username profileImage")

        // 🔥 Followers fetch end

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token)

        res.status(200).json({
            message: "User loggedIn successfully.",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage,
                followers: followersData,
                followersCount: followersData.length
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

async function getMeController(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ========================
        // 🔹 FOLLOWERS
        // ========================
        const followersList = await followModel.find({
            followee: user.username
        });

        const followerUsernames = followersList.map(f => f.follower);

        const followersData = await userModel.find({
            username: { $in: followerUsernames }
        }).select("username profileImage");


        // ========================
        // 🔹 FOLLOWING
        // ========================
        const followingList = await followModel.find({
            follower: user.username
        });

        const followingUsernames = followingList.map(f => f.followee);

        const followingData = await userModel.find({
            username: { $in: followingUsernames }
        }).select("username profileImage");


        // ========================
        // 🔹 OTHERS (Not followed users)
        // ========================

        const excludedUsernames = [
            user.username,          // khud ko hatao
            ...followingUsernames   // jinko already follow kar rahe ho
        ];

        const otherUsers = await userModel.find({
            username: { $nin: excludedUsernames }
        }).select("username profileImage");


        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage,

                followers: followersData,
                followersCount: followersData.length,

                following: followingData,
                followingCount: followingData.length,

                others: otherUsers,
                othersCount: otherUsers.length
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    registerController,
    loginController,
    getMeController
}