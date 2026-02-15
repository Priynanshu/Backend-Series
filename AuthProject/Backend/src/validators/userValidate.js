const yup = require("yup")

const userSchema = yup.object({
    name: yup.string().trim().min(3).required(),
    email: yup.string().email().trim().required(),
    password: yup.string().min(4).required()
})

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body)
        next()
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { userSchema, validate }
