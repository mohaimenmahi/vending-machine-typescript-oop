"use strict";
// singleton for money
Object.defineProperty(exports, "__esModule", { value: true });
class Money {
    constructor() {
    }
    static getMoneyInstance() {
        if (!Money.instance) {
            Money.instance = new Money();
        }
        return Money.instance;
    }
    static getMoneyList() {
        return Money.moneyList;
    }
    static setStaticArray(list) {
        if (Money.instance) {
            Money.moneyList = list;
        }
    }
    static convertString(money) {
        let code = money.composition.toUpperCase()
            + '-'
            + money.color.toUpperCase()
            + '-'
            + money.obverse.toUpperCase()
            + '-'
            + money.reverse.toUpperCase();
        return code;
    }
    // admin will add the codes, value and count 
    static addConfigMoney(money) {
        let list = this.getMoneyList();
        let index = list.findIndex((item) => this.convertString(item) === this.convertString(money));
        if (index >= 0) {
            list[index].count += money.count;
        }
        else {
            list.push(money);
        }
        this.setStaticArray(list);
    }
    static insertMoney(code) {
        let list = this.getMoneyList();
        let index = list.findIndex((item) => this.convertString(item) === code.toUpperCase());
        if (index >= 0) {
            list[index].count += 1;
            this.setStaticArray(list);
            return list;
        }
    }
    static returnMoney(value) {
        let list = this.getMoneyList();
        list = list.sort((a, b) => a.value < b.value ? -1 : 1);
        let len = list.length;
        let remain = value;
        let i = len - 1;
        while (remain > 0) {
            if (i < 0)
                break;
            if (list[i].value > remain)
                i--;
            else {
                let div = Math.floor(remain / list[i].value);
                if (list[i].count >= div) {
                    remain = remain % list[i].value;
                    list[i].count -= div;
                }
                else
                    i--;
            }
        }
        if (remain === 0) {
            this.setStaticArray(list);
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Money = Money;
Money.moneyList = [];
function client() {
    let m1 = new Object({
        composition: "STEEL",
        color: 'SILVER',
        obverse: "EDUCATION",
        reverse: "SHAPLA",
        value: 2,
        count: 10,
        type: "coin"
    });
    Money.addConfigMoney(m1);
    let m2 = new Object({
        composition: "STEEL",
        color: 'SILVER',
        obverse: "JAMUNA",
        reverse: "SHAPLA",
        value: 5,
        count: 10,
        type: "coin"
    });
    Money.addConfigMoney(m2);
    let m3 = new Object({
        composition: "PAPER",
        color: "PINK",
        obverse: "BB",
        reverse: "BMM",
        value: 10,
        count: 10,
        type: "note"
    });
    Money.addConfigMoney(m3);
    console.log("Money after Configure: ", Money.getMoneyList());
    let code = "STEEL-SILVER-JAMUNA-SHAPLA";
    console.log("Money Inserted: ", Money.insertMoney(code));
    console.log("Money After Inserting: ", Money.getMoneyList());
    console.log("Money Returned: ", Money.returnMoney(12));
    console.log('Money After Return', Money.getMoneyList());
}
client();
