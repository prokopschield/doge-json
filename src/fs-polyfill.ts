import fs from 'fs';

if ((typeof window === 'object') && (window.localStorage)) {
	if (!('writeFileSync' in fs)) {
		Object.assign(fs, {
			writeFileSync: (path: string, data: string) => {
				window.localStorage.setItem(`doge-json_${path}`, data);
			},
			existsSync: (path: string) => `doge-json_${path}` in window.localStorage,
			readFileSync: (path: string) => window.localStorage.getItem(`doge-json_${path}`),
			readdirSync: (path: string) => Object.keys(window.localStorage).filter(a => a.includes(path)).map(a => a.substr(a.indexOf(path) + path.length)),
			mkdirSync: (path: string) => window.localStorage.setItem(path, JSON.stringify(fs.readdirSync(path))),
			statSync: (path: string) => ({ isFile: () => !!window.localStorage.getItem(path), isDirectory: () => !window.localStorage.getItem(path) }),
		});
	}
}

export default fs;
module.exports = fs;

Object.assign(fs, {
	default: fs,
	fs,
});
