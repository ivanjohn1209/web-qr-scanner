export const keys = {
    token: 'auth-token',
    ref_store: 'ref-store',
};
export const LocalStorageUtility = {
    setLocalValue,
    getLocalValue,
    deleteLocalValue
};
function setLocalValue(key, value) {
    localStorage.setItem(key, value);
}

function getLocalValue(key) {
    return localStorage.getItem(key);
}
function deleteLocalValue(key) {
    localStorage.removeItem(key);
}