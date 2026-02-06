const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookiesParser = require('cookie-parser');

app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use(cookiesParser());

module.exports = app;