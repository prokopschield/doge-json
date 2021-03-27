"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function read(file) {
    if (!fs_1.existsSync(file)) {
        const dir = path_1.resolve(file, '..');
        const base = path_1.basename(file);
        const rd = fs_1.readdirSync(dir)
            .filter(a => a.includes(base));
        if (rd.length) {
            for (const filename of rd) {
                const tfile = path_1.resolve(dir, filename);
                const stat = fs_1.statSync(tfile);
                if (!stat.isDirectory()) {
                    file = tfile;
                    break;
                }
            }
        }
    }
    if (fs_1.existsSync(file)) {
        var data = fs_1.readFileSync(file, 'utf-8');
        try {
            data = JSON.parse(data);
        }
        catch (e) { }
        return data;
    }
    else
        return null;
}
exports.read = read;
