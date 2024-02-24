import {calculatePoints} from "../pointsCalculator";

describe('Points calculator tests', () => {
    it('should return right value', () => {
        expect(calculatePoints(120)).toEqual(90);
        expect(calculatePoints(49)).toEqual(0);
        expect(calculatePoints(100)).toEqual(50);
        expect(calculatePoints(101)).toEqual(52);
        expect(calculatePoints(99)).toEqual(49);
        expect(calculatePoints(99.6)).toEqual(50);
        expect(calculatePoints(105.2)).toEqual(60);
    });
    it('should return 0 and throw error', () => {
        const errorSpy = jest.spyOn(global.console, 'error');
        expect(calculatePoints(null)).toEqual(0);
        expect(calculatePoints('')).toEqual(0);
        expect(calculatePoints('asdasd')).toEqual(0);
        expect(calculatePoints([])).toEqual(0);

        expect(errorSpy).toHaveBeenCalledTimes(4);
    });

});