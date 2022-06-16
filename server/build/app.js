"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const user_1 = require("./routes/api/user");
const blogpost_1 = require("./routes/api/blogpost");
require("dotenv/config");
const mongoose_1 = require("mongoose");
const app = express();
const mongodb = process.env.DBCONNECTION;
mongoose_1.default.connect(mongodb);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var corsOptions = {
    origin: [
        'https://blogclient-twentysixhugs.netlify.app/',
        'https://blogcms-twentysixhugs.netlify.app/login',
    ],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', user_1.default);
app.use('/api', blogpost_1.default);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        success: false,
        errors: [{ msg: err.message, status: err.status }],
    });
});
exports.default = app;
