"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isString(str) {
    if (str) {
        if (str.length)
            return true;
        else
            return false;
    }
    else
        return false;
}
exports.isString = isString;
function validConvert(str) {
    return str.replace(/[\s|&;$%@"<>()+,-]/g, "");
}
exports.validConvert = validConvert;
