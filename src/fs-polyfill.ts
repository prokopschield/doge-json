export const localStorage = (globalThis as any)?.localStorage;

export const fs: {
	writeFileSync: (path: string, data: string) => void;
	existsSync: (path: string) => boolean;
	readFileSync: (path: string) => string | Buffer;
	readdirSync: (path: string) => string[];
	mkdirSync: (path: string, opts?: { recursive: boolean }) => void;
	statSync: (path: string) => {
		isFile: () => boolean;
		isDirectory: () => boolean;
	};
} = !localStorage
	? require('fs')
	: {
			writeFileSync: (path: string, data: string) => {
				localStorage.setItem(`doge-json_${path}`, data);
			},
			existsSync: (path: string) => `doge-json_${path}` in localStorage,
			readFileSync: (path: string) =>
				localStorage.getItem(`doge-json_${path}`) || '',
			readdirSync: (path: string) =>
				Object.keys(localStorage)
					.filter((a) => a.includes(path))
					.map((a) => a.slice(a.indexOf(path) + path.length)),
			mkdirSync: (path: string) =>
				localStorage.setItem(
					`doge-json_${path}`,
					JSON.stringify(fs.readdirSync(path))
				),
			statSync: (path: string) => ({
				isFile: () => !!localStorage.getItem(path),
				isDirectory: () => !localStorage.getItem(path),
			}),
	  };
export default fs;
