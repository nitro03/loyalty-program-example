import {processRequest, GET_USER_ENDPOINT, GET_TRANSACTIONS_ENDPOINT} from "../fakeServer";
import allUsers from '../../data/users.json'
import allTransactions from '../../data/transactions.json'
import {ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE} from "../fakeResponse";

describe('Server tests', () => {
    it('should respond user data', async () => {
        const url = `${GET_USER_ENDPOINT}?id=user_1`;
        const expectedResult = {
            code: SUCCESS_CODE,
            data: [allUsers[0]]
        };
        const data = await processRequest(url);
        expect(data).toEqual(expectedResult);
    });
    it('should respond transactions data', async () => {
        const url = `${GET_TRANSACTIONS_ENDPOINT}?userId=user_1`;
        /*
        Transactions for user_1:
        "txn_443", "txn_294", "txn_213", "txn_329", "txn_107"
        */
        const expectedResult = {
            code: SUCCESS_CODE,
            data: [allTransactions[442], allTransactions[293], allTransactions[212], allTransactions[328], allTransactions[106], allTransactions[18]]
        };
        const data = await processRequest(url);
        expect(data).toEqual(expectedResult);
    });
    it('should filter transactions data by date', async () => {
        const dateFrom = 1682089687000;
        const dateTo = 1682262487000;
        const url = `${GET_TRANSACTIONS_ENDPOINT}?userId=user_1&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        /*
        Transactions for user_1:
        "txn_107"
        */
        const expectedResult = {
            code: SUCCESS_CODE,
            data: [allTransactions[106]]
        };
        const data = await processRequest(url);
        expect(data).toEqual(expectedResult);
    });
    it('should throw error because of wrong dateTo param', async () => {
        const url = `${GET_TRANSACTIONS_ENDPOINT}?userId=user_1&dateFrom=1677168487&dateTo=123`;
        let expectedErr = null;
        try {
            await processRequest(url);
        } catch (e) {
            expectedErr = e;
        }
        expect(expectedErr?.code).toBe(ERROR_CODE);
    });
    it('should throw error because of wrong dateFrom param', async () => {
        const url = `${GET_TRANSACTIONS_ENDPOINT}?userId=user_1&dateFrom=asdw`;
        let expectedErr = null;
        try {
            await processRequest(url);
        } catch (e) {
            expectedErr = e;
        }
        expect(expectedErr?.code).toBe(ERROR_CODE);
    });
    it('should respond error', async () => {
        const url = `/that/is/no/such/endpoint?userId=user_1`;
        const expectedError = {
            code: NOT_FOUND_CODE,
            error: 'Not Found'
        };
        let err = null;
        try {
            await processRequest(url);
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(expectedError);
    });
})