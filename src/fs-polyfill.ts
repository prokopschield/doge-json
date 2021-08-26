import fs from 'fs';

if (typeof window === 'object' && window.localStorage) {
	if (!('writeFileSync' in fs)) {
		Object.assign(fs, {
			writeFileSync: (path: string, data: string) => {
				window.localStorage.setItem(`doge-json_${path}`, data);
			},
			existsSync: (path: string) => `doge-json_${path}` in window.localStorage,
			readFileSync: (path: string) =>
				window.localStorage.getItem(`doge-json_${path}`),
			readdirSync: (path: string) =>
				Object.keys(window.localStorage)
					.filter((a) => a.includes(path))
					.map((a) => a.substr(a.indexOf(path) + path.length)),
			mkdirSync: (path: string) =>
				window.localStorage.setItem(
					`doge-json_${path}`,
					JSON.stringify(fs.readdirSync(path))
				),
			statSync: (path: string) => ({
				isFile: () => !!window.localStorage.getItem(path),
				isDirectory: () => !window.localStorage.getItem(path),
			}),
		});
	}
}

if (!Object.getOwnPropertyNames(fs).includes('default')) {
	Object.defineProperty(fs, 'default', { get: () => fs });
}

if (!Object.getOwnPropertyNames(fs).includes('fs')) {
	Object.defineProperty(fs, 'fs', { get: () => fs });
}

export = fs;
