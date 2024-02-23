const SUCCESS_CODE = 200;
const ERROR_CODE = 500;
const ERROR_MSG = 'Internal Server Error';
const NOT_FOUND_CODE = 404;
const NOT_FOUND_MSG = 'Not Found';

const fakeSuccess = function (data) {
    return {
        code: SUCCESS_CODE,
        data: data
    }
}

const fakeFail = function (err) {
    const errMsg = err ? err : '';
    return {
        code: ERROR_CODE,
        error: `${ERROR_MSG} \n \n${errMsg}`
    }
}

const fakeNotFound = function () {
    return {
        code: NOT_FOUND_CODE,
        error: NOT_FOUND_MSG
    }
}

export {
    SUCCESS_CODE,
    ERROR_CODE,
    NOT_FOUND_CODE,
    fakeFail,
    fakeSuccess,
    fakeNotFound
}