import { encode } from './encode';
import { normalize_object } from './normalize-object';

/**
 * Encode an annoying thing
 * 
 * Deals with recursive objects, symbols, etc.
 * 
 * @param thing Some thing
 * @returns the JSON reprezentation of the thing
 */
export function encode_annoying (thing: any): string {
	if (
		(typeof thing === 'boolean')
	||	(typeof thing === 'number')
	||	(typeof thing === 'bigint')
	) {
		return `${thing}`;
	} else if (
		(typeof thing === 'string')
	||	(typeof thing === 'symbol')
	||	(typeof thing === 'function')
	) {
		return encode(thing.toString())
	} else if (thing && typeof thing === 'object') {
		return encode(normalize_object(thing));
	} else {
		return 'null';
	}
}

export default encode_annoying;
module.exports = encode_annoying;

Object.assign(encode_annoying, {
	default: encode_annoying,
	encode_annoying,
});
