"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const fs_1 = require("fs");
function write(file, data) {
    if (!file.includes('.'))
        file = `${file}.json`;
    fs_1.writeFileSync(file, JSON.stringify(data, null, '\t') + '\n');
}
exports.write = write;
