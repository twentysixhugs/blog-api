"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController = require("../../controllers/UserController");
const router = express.Router();
router.post('/login', userController.login);
router.post('/signup', userController.signup);
exports.default = router;
