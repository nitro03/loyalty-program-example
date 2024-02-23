const processQueryString = (queryString) => {
    if (queryString) {
        const params = queryString.split("&");
        return (params || []).reduce((result, param) => {
            const splitParam = param.split("=");
            const key = splitParam[0];
            const value = splitParam[1];
            const paramVals = result[key] ? result[key] : []
            paramVals.push(value);
            return {
                ...result,
                [key]: paramVals
            };
        }, {});
    }
    return {};
}
const parseUrl = (url) => {
    const splitUrl = url?.split('?');
    const endpoint = splitUrl[0];
    const queryString = splitUrl[1];
    return {
        endpoint,
        queryParams: processQueryString(queryString)
    }
};
export {
    parseUrl
};