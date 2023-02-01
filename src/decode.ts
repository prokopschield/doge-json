/**
 * Decode JSON
 * @param json The JSON you wish to decode
 * @returns the decoded value
 */
export function decode(json: string) {
	try {
		return JSON.parse(json);
	} catch (error) {
		return json;
	}
}

Object.defineProperties(decode, {
	default: { get: () => decode },
	decode: { get: () => decode },
});

export default decode;
