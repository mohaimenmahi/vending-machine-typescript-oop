"use strict";
// singleton for money
Object.defineProperty(exports, "__esModule", { value: true });
class Money {
    constructor() { }
    static getMoneyInstance() {
        if (!Money.instance) {
            Money.instance = new Money();
        }
        return Money.instance;
    }
    getMoneyList() {
        return Money.moneyList;
    }
    setStaticArray(list) {
        Money.moneyList = list;
    }
    convertString(money) {
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
    addConfigMoney(money) {
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
    removeConfigMoney(code) {
        let list = this.getMoneyList();
        let index = list.findIndex((item) => this.convertString(item) === code.toUpperCase());
        if (index >= 0) {
            list[index].count = 0;
            this.setStaticArray(list);
            return true;
        }
        else {
            return false;
        }
    }
    upateMoney(code, count) {
        let list = this.getMoneyList();
        let index = list.findIndex((item) => this.convertString(item) === code.toUpperCase());
        if (index >= 0) {
            list[index].count = count;
            this.setStaticArray(list);
            return list[index];
        }
        else {
            return null;
        }
    }
    insertMoney(code) {
        let list = this.getMoneyList();
        let index = list.findIndex((item) => this.convertString(item) === code.toUpperCase());
        if (index >= 0) {
            list[index].count += 1;
            this.setStaticArray(list);
            return list[index];
        }
        else {
            return null;
        }
    }
    returnMoney(value) {
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
function init() {
    let m = Money.getMoneyInstance();
    let m1 = new Object({
        composition: "STEEL",
        color: 'SILVER',
        obverse: "EDUCATION",
        reverse: "SHAPLA",
        value: 2,
        count: 0,
        type: "coin"
    });
    m.addConfigMoney(m1);
    let m2 = new Object({
        composition: "STEEL",
        color: 'SILVER',
        obverse: "JAMUNA",
        reverse: "SHAPLA",
        value: 5,
        count: 0,
        type: "coin"
    });
    m.addConfigMoney(m2);
    let m3 = new Object({
        composition: "PAPER",
        color: "PINK",
        obverse: "BB",
        reverse: "BMM",
        value: 10,
        count: 0,
        type: "note"
    });
    m.addConfigMoney(m3);
    let m4 = new Object({
        composition: "PAPER",
        color: "GREEN",
        obverse: "BB",
        reverse: "SDM",
        value: 20,
        count: 0,
        type: "note"
    });
    m.addConfigMoney(m4);
}
exports.init = init;
