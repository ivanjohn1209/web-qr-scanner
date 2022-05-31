import { api } from "../config/config"
import { HttpRequestUtility } from "../utility/HttpRequestUtility"
import StudentDM from "../DataModel/StudentDM";
import { keys, LocalStorageUtility } from "../utility/LocalStorageUtility";
import ErrorDM from "../DataModel/ErrorDM";
export const AuthService = {
    Login,
    getSessionInfo
}

/**
 * Register new Student QR
 * @param {StudentDM} data 
 */
async function Login(username, password) {
    var param = {
        "username": username,
        "password": password
    }
    return HttpRequestUtility.postJson(api + "account/login", param)
        .then(res => {
            LocalStorageUtility.setLocalValue(keys.token, res.token)
            return res
        })
}

async function getSessionInfo() {
    var param = {
    }
    var token = LocalStorageUtility.getLocalValue(keys.token)
    if (token)
        return HttpRequestUtility.postJson(api + "account/sessioninfo", param)
            .then(res => {
                return res
            })
    else
        throw new ErrorDM()
}


