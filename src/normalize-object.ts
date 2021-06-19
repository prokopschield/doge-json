import { decode } from './decode';
import { encode_annoying } from './encode-annoying';

export interface NormalizedObject {
	[field: string]: Normalized | string;
}

export interface NormalizedArray extends Array<Normalized | string> {
	[entry: number]: Normalized | string;
}

export type Normalized = NormalizedObject | NormalizedArray;

/**
 * Normalize object - remove un-JSON-able values
 * @param o The object you want normalized
 * @param stack Ignore this parameter
 * @returns a normalized object
 */
export function normalize_object (o: object, stack?: object[]): Normalized {
	if (!stack) stack = [];
	if (o instanceof Array) {
		return o.map(a => (
			(typeof a === 'object')
			? normalize_object(a)
			: decode(encode_annoying(a))
		));
	} else {
		const normalized: NormalizedObject = {};
		for (const [ field, value ] of Object.entries(o)) {
			if (typeof value === 'object') {
				if (stack.includes(value)) {
					normalized[field] = '<< RECURSION >>';
				} else {
					stack.push(value);
					normalized[field] = normalize_object(value, stack);
					stack.pop();
				}
			} else {
				normalized[field] = decode(encode_annoying(value));
			}
		}
		return normalized;
	}
}

export default normalize_object;
module.exports = normalize_object;

Object.assign(normalize_object, {
	default: normalize_object,
	normalize_object,
});
