const fs: {
	writeFileSync: (path: string, data: string) => void;
	existsSync: (path: string) => boolean;
	readFileSync: (path: string) => null | string | Buffer;
	readdirSync: (path: string) => string[];
	mkdirSync: (path: string, opts?: { recursive: boolean }) => void;
	statSync: (path: string) => {
		isFile: () => boolean;
		isDirectory: () => boolean;
	};
} =
	typeof window === 'undefined'
		? require('fs')
		: {
				writeFileSync: (path: string, data: string) => {
					window.localStorage.setItem(`doge-json_${path}`, data);
				},
				existsSync: (path: string) =>
					`doge-json_${path}` in window.localStorage,
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
		  };
export = fs;
