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

export default decode;
module.exports = decode;

Object.assign(decode, {
	default: decode,
	decode,
});
