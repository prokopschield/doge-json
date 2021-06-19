import { encode } from './encode';
import fs from './fs-polyfill';
import path from 'path';

/**
 * Write any object to a file as JSON
 * @param file Path to file
 * @param data Data you want to write
 */
export function write (file: string, data: any) {
	if (!file.includes('.')) file = `${file}.json`;
	const directory = path.resolve(file, '..');
	if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
	fs.writeFileSync(file, encode(data));
}

export default write;
module.exports = write;

Object.assign(write, {
	default: write,
	write,
});
