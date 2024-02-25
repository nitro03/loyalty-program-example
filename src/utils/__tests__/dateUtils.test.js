import {isTimestamp, getTimestamp, ERROR_ISO_STRING} from "../dateUtils";

describe('Date Utils tests', () => {
    it('should return false in timestamp check', () => {
        const input = "asd";
        expect(isTimestamp(input)).toBe(false);
    });
    it('should return true in timestamp check', () => {
        const input = 1658396131820;
        expect(isTimestamp(input)).toBe(true);
    });
    it('should return timestamp from ISO String', () => {
        const input = '2022-07-21T09:35:31.820';
        const output = 1658388931820;
        expect(getTimestamp(input)).toEqual(output);
    });
    it('should return error while converting ISO String to timestamp', () => {
        const input = '2022-07-21'
        let err = null;
        try {
            getTimestamp(input)
        } catch (e) {
            err = e;
        }
        expect(err?.message).toBe(ERROR_ISO_STRING);
    });

});