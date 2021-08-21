import rate from '../resources/rate.json';

export interface Employee {
    firstName: string,
    lastName: string,
    annualSalary: number,
    paymentMonth: number,
    superRate: number
};

export interface PaySlip {
    employee: Employee,
    fromDate: string,
    toDate: string,
    grossIncome: number,
    superannuation: number,
    incomeTax: number,
    netIncome: number
};

export function calIncomeTax (annualSalary: number) {
    let incomeTax: number = -1;
    for (let element of rate) {
        if (annualSalary <= element.threshold) {
            incomeTax = Math.round((element.plus + element.rate * (annualSalary - element.bottom + 1)) / 12);
            break;
        }
    }
    return incomeTax;
};

function mapMonthName (monthNum: number) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNum];
}

export function calFromDate (monthNum: number) {
    let date = new Date( 2021, monthNum - 1, 1);
    return date.getDate() + ' ' + mapMonthName(monthNum - 1);
};

export function calToDate (monthNum: number) {
    let date = new Date( 2021, monthNum, 0);
    return date.getDate() + ' ' + mapMonthName(monthNum - 1);
};