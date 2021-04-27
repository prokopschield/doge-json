"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = exports.write = exports.read = void 0;
var read_1 = require("./read");
Object.defineProperty(exports, "read", { enumerable: true, get: function () { return read_1.read; } });
var write_1 = require("./write");
Object.defineProperty(exports, "write", { enumerable: true, get: function () { return write_1.write; } });
const fs_polyfill_1 = __importDefault(require("./fs-polyfill"));
exports.fs = fs_polyfill_1.default;
