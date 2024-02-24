import {processRequest} from "../simulatedAPI/fakeServer";

class ApiCaller {

    static async fetchData({url, method, body}, onSuccess, onError) {
        //there are fake requests so method and body won't be used
        await processRequest(url)
            .then((response) => {
                const {data} = response;
                onSuccess(data)
            })
            .catch((response)=>{
                const {error} = response;
                onError?.(error);
            })
    }
}

export default ApiCaller;