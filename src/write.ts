import { writeFileSync } from 'fs';

export function write (file: string, data: any) {
	if (!file.includes('.')) file = `${file}.json`;
	writeFileSync(file, JSON.stringify(data, null, '\t') + '\n');
}
