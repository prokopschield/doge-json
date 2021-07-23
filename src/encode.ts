import { normalize_object } from './normalize-object';
import { map, set } from './transforms';

/**
 * Encode an annoying thing
 *
 * Deals with recursive objects, symbols, etc.
 *
 * @param thing Some thing
 * @returns the JSON reprezentation of the thing
 */
export function encode(thing: any): string {
	if (thing instanceof Map) return encode(map(thing));
	if (thing instanceof Set) return encode(set(thing));
	if (
		typeof thing === 'boolean' ||
		typeof thing === 'number' ||
		typeof thing === 'bigint'
	) {
		return `${thing}`;
	} else if (
		typeof thing === 'string' ||
		typeof thing === 'symbol' ||
		typeof thing === 'function'
	) {
		return JSON.stringify(thing.toString());
	} else if (thing && typeof thing === 'object') {
		return JSON.stringify(normalize_object(thing), null, '\t') + '\n';
	} else {
		return 'null';
	}
}

export default encode;
module.exports = encode;

Object.assign(encode, {
	default: encode,
	encode,
});
