"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogPostSchema = new mongoose_1.Schema({
    title: String,
    text: String,
    datePublished: mongoose_1.SchemaTypes.Mixed,
    dateEdited: mongoose_1.SchemaTypes.Mixed,
    author: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'user',
    },
});
exports.default = (0, mongoose_1.model)('blogpost', blogPostSchema);
