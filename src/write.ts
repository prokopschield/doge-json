import fs from './fs-polyfill';
import path from 'path';

export function write (file: string, data: any) {
	if (!file.includes('.')) file = `${file}.json`;
	const directory = path.resolve(file, '..');
	if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
	fs.writeFileSync(file, JSON.stringify(data, null, '\t') + '\n');
}

export default write;
module.exports = write;

Object.assign(write, {
	default: write,
	write,
});
