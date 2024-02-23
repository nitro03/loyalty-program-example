import {fakeFail, fakeSuccess, fakeNotFound} from "./fakeResponse";
import {parseUrl} from "./urlParser";
import {getUserData, getTransactionsData} from "./dataProvider";

const MIN_RESP_TIME = 50
const MAX_RESP_TIME = 1000;

const GET_USER_ENDPOINT = '/rest/api/user'
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

    return new Promise((resolve) => {
        const timeout = getRandomRespTime();
        setTimeout(() => {
            resolve(serverLogic(url));
        }, timeout);
    });

}

export {
    processRequest,
    GET_USER_ENDPOINT,
    GET_TRANSACTIONS_ENDPOINT
}
