
import express from "express";
import {Employee, PaySlip, calFromDate, calToDate, calIncomeTax} from "../services/postService";

const app = express();

app.use(express.json());

app.post('/payslips', (req, res) => {

   let jsonObjs = req.body;
   console.log(jsonObjs);
   let emp: Employee;
   let empList: Array<Employee> = [];
   let paySlipList: Array<PaySlip> = [];

   for (let element of jsonObjs) {
      emp = element;
      empList.push(emp);
   }

   for (let emp of empList) {
      let paySlip: PaySlip = {
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
      paySlip.fromDate = calFromDate(emp.paymentMonth);
      paySlip.toDate = calToDate(emp.paymentMonth);
      paySlip.grossIncome = Math.round(emp.annualSalary / 12);
      paySlip.incomeTax = calIncomeTax(emp.annualSalary);
      paySlip.superannuation = Math.round(emp.annualSalary * emp.superRate / 12);
      paySlip.netIncome = paySlip.grossIncome - paySlip.incomeTax;
      paySlipList.push(paySlip);
   }
   res.send(paySlipList);
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));