import { keys, LocalStorageUtility } from './LocalStorageUtility';

const IsEmpty = (str) => {
    return str === '' || str === null || str === undefined;
};
const IsObjEmpty = (obj) => {
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
};
const IsArrEmpty = (arr) => {
    return arr === null || arr === undefined || arr.length === 0;
};
const GenerateString = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};
const isFunction = (functionToCheck) => {
    var getType = {};
    return functionToCheck !== undefined && getType.toString.call(functionToCheck) === '[object Function]';
};
const getStoreRef = () => {
    var store_ref = LocalStorageUtility.getLocalValue(keys.ref_store);
    return store_ref;
};

const getJsonFromURL = () => {
    var pairs = window.location.search.substring(1).split('&'),
        obj = {},
        pair,
        i;

    for (i in pairs) {
        if (pairs[i] === '') continue;

        pair = pairs[i].split('=');
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return obj;
};
const getParamFromURL = (param) => {
    var json = getJsonFromURL();
    return json[param];
};
const IsArray = (arr) => {
    return Array.isArray(arr);
};

export {
    GenerateString,
    isFunction,
    IsEmpty,
    getJsonFromURL,
    getParamFromURL,
    IsObjEmpty,
    IsArrEmpty,
    getStoreRef,
    IsArray
};