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
} =
	typeof globalThis === 'undefined' ||
	typeof globalThis.localStorage === 'undefined'
		? require('fs')
		: {
				writeFileSync: (path: string, data: string) => {
					globalThis.localStorage.setItem(`doge-json_${path}`, data);
				},
				existsSync: (path: string) =>
					`doge-json_${path}` in globalThis.localStorage,
				readFileSync: (path: string) =>
					globalThis.localStorage.getItem(`doge-json_${path}`) || '',
				readdirSync: (path: string) =>
					Object.keys(globalThis.localStorage)
						.filter((a) => a.includes(path))
						.map((a) => a.slice(a.indexOf(path) + path.length)),
				mkdirSync: (path: string) =>
					globalThis.localStorage.setItem(
						`doge-json_${path}`,
						JSON.stringify(fs.readdirSync(path))
					),
				statSync: (path: string) => ({
					isFile: () => !!globalThis.localStorage.getItem(path),
					isDirectory: () => !globalThis.localStorage.getItem(path),
				}),
		  };
export default fs;
