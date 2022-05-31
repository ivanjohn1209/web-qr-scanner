import { api } from "../config/config"
import { HttpRequestUtility } from "../utility/HttpRequestUtility"
import StudentDM from "../DataModel/StudentDM";
export const StudentService = {
    registerNewStudent,
    listStudent,
    checkStudentQR
}

/**
 * Register new Student QR
 * @param {StudentDM} data 
 */
async function registerNewStudent(data) {
    var param = {
        qrId: data.qrId,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        grade: data.grade,
        section: data.section,
        gender: data.gender,
        lrn: data.lrn
    }
    return HttpRequestUtility.postJson(api + "students/register-qr", param)
        .then(res => {
            return res
        })
}


/**
 * List Student
 * @param {any} data 
 */
async function listStudent(data) {
    var param = {
        section: data.section,
        grade: data.grade,
        date: data.date
    }

    return HttpRequestUtility.postJson(api + "students/list", param)
        .then(res => {
            return res
        })
}

/**
 * List Student
 * @param {any} data 
 */
async function checkStudentQR(qrId) {
    var param = {
        qrId: qrId,
    }

    return HttpRequestUtility.postJson(api + "qrscanner/check-qr", param)
        .then(res => {
            return res
        })
}
