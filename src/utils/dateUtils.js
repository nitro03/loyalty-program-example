const ERROR_ISO_STRING = "String is not an ISO date format";
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/;

const getTimestamp = (dateISOString) => {
    if (!isIsoDate(dateISOString)) {
        throw new Error(ERROR_ISO_STRING)
    }
    return new Date(dateISOString).getTime();
}

const isIsoDate = (str) => {
    return ISO_8601_REGEX.test(str);
}

const isTimestamp = (timestamp) => {
    const newTimestamp = new Date(timestamp).getTime();
    return isNumeric(newTimestamp);
}

const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export {
    isTimestamp,
    getTimestamp,
    ERROR_ISO_STRING
}