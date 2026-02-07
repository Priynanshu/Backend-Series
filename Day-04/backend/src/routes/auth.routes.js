const express = require('express');
const UserModal = require('../modals/user.modal');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post('/register', async (req, res)=> {
    const {name, email, password} = req.body;

    const isUserExist = await UserModal.findOne({email});
    if(isUserExist) {
        return res.status(400).json({message: 'User already exists with this email'});
    }

    const user = await UserModal.create({
        name,
        email,
        password
    })

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user,
        token
    })
    console.log(token);
})

authRouter.post('/login', async (req, res)=> {
    const {email, password} = req.body;
    const user = await UserModal.findOne({email});

    if(!user) {
        return res.status(404).json({message: 'User not found with this email'});
    }

    const isPasswordMatch = user.password === password;

    if(!isPasswordMatch) {
        return res.status(400).json({message: 'Invalid password'});
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(200).json({
        message: 'User logged in successfully',
        user,
        token
    })
})

module.exports = authRouter;