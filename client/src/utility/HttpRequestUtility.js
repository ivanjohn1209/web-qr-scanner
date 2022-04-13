import ErrorDM from "../DataModel/ErrorDM";
import { keys, LocalStorageUtility } from "./LocalStorageUtility";
import { IsEmpty } from "./ToolFtc";

export const HttpRequestUtility = {
    postJson,
};

function postJson(api, body) {
    var myHeaders = new Headers();
    var token = LocalStorageUtility.getLocalValue(keys.token);
    myHeaders.append('Content-Type', 'application/json; charset=UTF-8');
    if (!IsEmpty(token)) {
        myHeaders.append('Authorization', `Bearer ${token}`);
        body['token'] = token;
    }
    // if (!IsEmpty(token))
    //     body['token'] = token;
    var raw = JSON.stringify(body);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        responseType: 'json',
        body: raw,
        redirect: 'follow',
    };

    return fetch(api, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                return response.text().then(text => {
                    let Error = {
                        err: text,
                        res: response
                    };
                    throw new ErrorDM(Error);
                });
            }
        })
        .then(response => {
            return response;
        })
        .catch(ex => {
            throw ex;
        });
}