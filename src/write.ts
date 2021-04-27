import fs from './fs-polyfill';

export function write (file: string, data: any) {
	if (!file.includes('.')) file = `${file}.json`;
	fs.writeFileSync(file, JSON.stringify(data, null, '\t') + '\n');
}
