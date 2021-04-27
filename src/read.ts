import fs from './fs-polyfill';

import {
	basename,
	resolve,
} from 'path';

export function read (file: string): any {
	if (!fs.existsSync(file)) {
		const dir = resolve(file, '..');
		const base = basename(file);
		const rd = fs.readdirSync(dir)
		.filter(a => a.includes(base))
		if (rd.length) {
			for (const filename of rd) {
				const tfile = resolve(dir, filename);
				const stat = fs.statSync(tfile);
				if (!stat.isDirectory()) {
					file = tfile;
					break;
				}
			}
		}
	}
	if (fs.existsSync(file)) {
		var data = fs.readFileSync(file, 'utf-8');
		try {
			data = JSON.parse(data);
		} catch (e) {}
		return data;
	} else return null;
}
