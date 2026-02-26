const jwt = require("jsonwebtoken")
const userModel = require("../models/user.models")

async function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Access token is missing or invalid"
      })
    }

    
      const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded)=> {
            if(err) {
                if(err.name === "TokenExpiredError") {
                    return res.status(400).json({
                        success: false,
                        message: "Access Token has expired, Please user refresh token to generate again"
                    })
                }

                return res.status(400).json({
                    success: false,
                    message: "Access Token is invalid or missing"
                })
            }

            const {userId} = decoded;
            const user = await userModel.findById(userId)

            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: "user not found"
                })
            }

            req.userId = user._id
            next()
        })
  }catch(err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = {isAuthenticated}