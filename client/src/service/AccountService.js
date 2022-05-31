import { api } from "../config/config"
import AccountDM from "../DataModel/AccountDM";
import { HttpRequestUtility } from "../utility/HttpRequestUtility";

export const AccountService = {
    getAccountList,
    createAccount
}

/**
 * Register new Student QR
 *
 */
async function getAccountList() {
    var param = {
    }
    return HttpRequestUtility.postJson(api + "account/list", param)
        .then(res => {
            return res
        })
}


async function createAccount(data) {
    var param = {
        username: data.username,
        password: data.password,
        role: data.role,
    }
    return HttpRequestUtility.postJson(api + "account/createuser", param)
        .then(res => {
            return res
        })
}
