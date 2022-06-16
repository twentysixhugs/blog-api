"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    author: String,
    post: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'blogpost',
    },
    text: {
        type: String,
    },
    date: Date,
});
exports.default = (0, mongoose_1.model)('comment', commentSchema);
