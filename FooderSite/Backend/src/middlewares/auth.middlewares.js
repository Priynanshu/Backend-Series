const foodPartnerModel = require("../models/foodpartner.models")
const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")

async function authFoodPartnerMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please Login First"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(404).json({
                message: "Food Partner not found"
            });
        }

        req.foodPartner = foodPartner;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
}

async function authUserMiddleware(req, res, next) {
     try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please Login First"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
}
module.exports = {authFoodPartnerMiddleware, authUserMiddleware}