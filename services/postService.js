"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calToDate = exports.calFromDate = exports.calIncomeTax = void 0;
const rate_json_1 = __importDefault(require("../resources/rate.json"));
;
;
function calIncomeTax(annualSalary) {
    let incomeTax = -1;
    for (let element of rate_json_1.default) {
        if (annualSalary <= element.threshold) {
            incomeTax = Math.round((element.plus + element.rate * (annualSalary - element.bottom + 1)) / 12);
            break;
        }
    }
    return incomeTax;
}
exports.calIncomeTax = calIncomeTax;
;
function mapMonthName(monthNum) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNum];
}
function calFromDate(monthNum) {
    let date = new Date(2021, monthNum - 1, 1);
    return date.getDate() + ' ' + mapMonthName(monthNum - 1);
}
exports.calFromDate = calFromDate;
;
function calToDate(monthNum) {
    let date = new Date(2021, monthNum, 0);
    return date.getDate() + ' ' + mapMonthName(monthNum - 1);
}
exports.calToDate = calToDate;
;
