"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profanityFilter = require('@twentysixhugs/profanity-filter');
profanityFilter.seed('profanity');
profanityFilter.setReplacementMethod('word');
exports.default = profanityFilter;
