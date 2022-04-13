export default class ErrorDM {
    constructor({ err, res }) {
        this.err = JSON.parse(err);
        this.res = res;
        this.status = res.status;
        this.msg = this.err.msg;
    }
}