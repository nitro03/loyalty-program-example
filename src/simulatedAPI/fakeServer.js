import {fakeFail, fakeSuccess, fakeNotFound, ERROR_CODE, NOT_FOUND_CODE} from "./fakeResponse";
import {parseUrl} from "./urlParser";
import {getUserData, getTransactionsData} from "./dataProvider";

const MIN_RESP_TIME = 50
const MAX_RESP_TIME = 1000;

const GET_USER_ENDPOINT = '/rest/api/users'
const GET_TRANSACTIONS_ENDPOINT = '/rest/api/transactions'

const getRandomRespTime = () => {
    const gap = (Math.random() * 10000) % (MAX_RESP_TIME - MIN_RESP_TIME);
    return MAX_RESP_TIME - gap;
}

const serverLogic = (url) => {
    const parsedUrl = parseUrl(url);

    try {
        if (parsedUrl.endpoint === GET_USER_ENDPOINT) {
            return fakeSuccess(getUserData(parsedUrl.queryParams));
        }
        if (parsedUrl.endpoint === GET_TRANSACTIONS_ENDPOINT) {
            return fakeSuccess(getTransactionsData(parsedUrl.queryParams));
        }
    } catch (e) {
        return fakeFail(e);
    }

    return fakeNotFound();
}

const processRequest = async (url) => {

    return new Promise((resolve, reject) => {
        const timeout = getRandomRespTime();
        setTimeout(() => {
            const response = serverLogic(url)
            const {code} = response;
            if(code === ERROR_CODE || code === NOT_FOUND_CODE){
                reject(response)
            } else {
                resolve(response);
            }
        }, timeout);
    });

}

export {
    processRequest,
    GET_USER_ENDPOINT,
    GET_TRANSACTIONS_ENDPOINT
}
