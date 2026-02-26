const followModel = require("../models/follow.models")
const userModel = require("../models/user.models")

async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "You cannaot follow yourself."
        })
    }

    const isAlreadyFollowed = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollowed) {
        return res.status(409).json({
            message: `You had already follow ${followeeUsername}`,
            follow: isAlreadyFollowed
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    return res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    }) 

}

async function unFollowUserController(req, res) {
   const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing) {
        return res.status(404).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    return res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

async function userFollowingStatus(req, res) {
    try {
        const followeeUsername  = req.user.username
        const requesterUsername = req.params.username
        const userStatus = req.body.status

        if (!["accepted", "rejected"].includes(userStatus)) {
            return res.status(400).json({
                message: "Invalid status"
            })
        }

        const followRequest = await followModel.findOne({
            follower: requesterUsername,
            followee: followeeUsername 
        })

        if (!followRequest) {
            return res.status(404).json({
                message: `No follow request from ${requesterUsername}`
            })
        }

        followRequest.status = userStatus
        await followRequest.save()

        return res.status(200).json({
            message: `Follow request ${userStatus}`,
            follow: followRequest
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

async function userFollowersController(req, res) {
    try {
        // Agar params mein username hai toh wo lo, nahi toh logged-in user ka lo
        const username = req.params.username || req.user.username;

        const followersList = await followModel.find({
            followee: username,
            status: "accepted"
        });

        // Agar aapko naam ke saath image bhi chahiye sidebar ke liye:
        // Hum userModel se match karke details nikal sakte hain
        const followersData = await userModel.find({
            username: { $in: followersList.map(f => f.follower) }
        }).select("username profileImage"); // Sirf zaroori fields lo

        return res.status(200).json({
            success: true,
            followers: followersData
        });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}


module.exports = {followUserController, unFollowUserController, userFollowingStatus, userFollowersController}