import encode_annoying from "./encode-annoying";

/**
 * Encode something
 * @param thing Some thing
 * @returns The JSON-encoded thing
 */
export function encode (thing: any): string {
	try {
		return JSON.stringify(thing, void null, '\t') + '\n';
	} catch (error) {
		return encode_annoying(thing);
	}
}

export default encode;
module.exports = encode;

Object.assign(encode, {
	default: encode,
	encode,
});
