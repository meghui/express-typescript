"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postService_1 = require("../services/postService");
const app = express_1.default();
app.use(express_1.default.json());
app.post('/payslips', (req, res) => {
    let jsonObjs = req.body;
    console.log(jsonObjs);
    let emp;
    let empList = [];
    let paySlipList = [];
    for (let element of jsonObjs) {
        emp = element;
        empList.push(emp);
    }
    for (let emp of empList) {
        let paySlip = {
            employee: {
                firstName: 'Unknown',
                lastName: 'Unknown',
                annualSalary: -1,
                paymentMonth: -1,
                superRate: -1
            },
            fromDate: 'Unknown',
            toDate: 'Unknown',
            grossIncome: -1,
            incomeTax: -1,
            superannuation: -1,
            netIncome: -1
        };
        paySlip.employee = emp;
        paySlip.fromDate = postService_1.calFromDate(emp.paymentMonth);
        paySlip.toDate = postService_1.calToDate(emp.paymentMonth);
        paySlip.grossIncome = Math.round(emp.annualSalary / 12);
        paySlip.incomeTax = postService_1.calIncomeTax(emp.annualSalary);
        paySlip.superannuation = Math.round(emp.annualSalary * emp.superRate / 12);
        paySlip.netIncome = paySlip.grossIncome - paySlip.incomeTax;
        paySlipList.push(paySlip);
    }
    res.send(paySlipList);
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
