import fs from './fs-polyfill';

import {
	basename,
	resolve,
} from 'path';

/**
 * Read and parse a JSON file
 * @param file path to file
 * @returns the object
 */
export function read (file: string): any {
	try {
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
	} catch (error) {
		return null;
	}
}

export default read;
module.exports = read;

Object.assign(read, {
	default: read,
	read,
});
