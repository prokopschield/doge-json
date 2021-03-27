import {
	existsSync,
	readFileSync,
	readdirSync,
	statSync,
} from 'fs';

import {
	basename,
	resolve,
} from 'path';

export function read (file: string) {
	if (!existsSync(file)) {
		const dir = resolve(file, '..');
		const base = basename(file);
		const rd = readdirSync(dir)
		.filter(a => a.includes(base))
		if (rd.length) {
			for (const filename of rd) {
				const tfile = resolve(dir, filename);
				const stat = statSync(tfile);
				if (!stat.isDirectory()) {
					file = tfile;
					break;
				}
			}
		}
	}
	if (existsSync(file)) {
		var data = readFileSync(file, 'utf-8');
		try {
			data = JSON.parse(data);
		} catch (e) {}
		return data;
	} else return null;
}
