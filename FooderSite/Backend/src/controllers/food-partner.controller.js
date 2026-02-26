const foodPartnerModel = require("../models/foodpartner.models")
const foodModel = require("../models/food.models")

async function getFoodPartnerById(req, res) {
    try{
        const foodPartnerId = req.params.id

        const foodPartner = await foodPartnerModel.findById(foodPartnerId)
        const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId})

        if(!foodPartner) {
            return res.status(404).json({
                message: "Food Partner Not Found"
            })
        }

        return res.status(200).json({
            message: "fetched food partner items successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        })
    }catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {getFoodPartnerById}