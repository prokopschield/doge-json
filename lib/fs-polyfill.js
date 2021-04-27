"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
if ((typeof window === 'object') && (window.localStorage)) {
    if (!('writeFileSync' in fs_1.default)) {
        Object.assign(fs_1.default, {
            writeFileSync: (path, data) => {
                window.localStorage.setItem(`doge-json_${path}`, data);
            },
            existsSync: (path) => `doge-json_${path}` in window.localStorage,
            readFileSync: (path) => window.localStorage.getItem(`doge-json_${path}`),
            readdirSync: (path) => Object.keys(window.localStorage).filter(a => a.includes(path)).map(a => a.substr(a.indexOf(path) + path.length)),
            mkdirSync: (path) => window.localStorage.setItem(path, JSON.stringify(fs_1.default.readdirSync(path))),
            statSync: (path) => ({ isFile: () => !!window.localStorage.getItem(path), isDirectory: () => !window.localStorage.getItem(path) }),
        });
    }
}
exports.default = fs_1.default;
module.exports = fs_1.default;
Object.assign(fs_1.default, {
    default: fs_1.default,
    fs: fs_1.default,
});
