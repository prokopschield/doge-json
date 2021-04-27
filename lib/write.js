"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const fs_polyfill_1 = __importDefault(require("./fs-polyfill"));
function write(file, data) {
    if (!file.includes('.'))
        file = `${file}.json`;
    fs_polyfill_1.default.writeFileSync(file, JSON.stringify(data, null, '\t') + '\n');
}
exports.write = write;
