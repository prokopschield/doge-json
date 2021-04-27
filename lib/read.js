"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = void 0;
const fs_polyfill_1 = __importDefault(require("./fs-polyfill"));
const path_1 = require("path");
function read(file) {
    if (!fs_polyfill_1.default.existsSync(file)) {
        const dir = path_1.resolve(file, '..');
        const base = path_1.basename(file);
        const rd = fs_polyfill_1.default.readdirSync(dir)
            .filter(a => a.includes(base));
        if (rd.length) {
            for (const filename of rd) {
                const tfile = path_1.resolve(dir, filename);
                const stat = fs_polyfill_1.default.statSync(tfile);
                if (!stat.isDirectory()) {
                    file = tfile;
                    break;
                }
            }
        }
    }
    if (fs_polyfill_1.default.existsSync(file)) {
        var data = fs_polyfill_1.default.readFileSync(file, 'utf-8');
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
