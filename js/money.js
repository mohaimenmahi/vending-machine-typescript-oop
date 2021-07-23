"use strict";
// singleton for money
Object.defineProperty(exports, "__esModule", { value: true });
function calculateReturn(remain, list) {
    let len = list.length;
    let i = len - 1;
    while (remain > 0) {
        if (i < 0)
            break;
        if (list[i].value > remain)
            i--;
        else {
            if (list[i].count > 0) {
                remain -= list[i].value;
                list[i].count -= 1;
            }
            else
                i--;
        }
    }
    return { remain, list };
}
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
        list = list.sort((a, b) => a.value < b.value ? -1 : 1);
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
    updateMoney(code, count) {
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
        let list = JSON.parse(JSON.stringify(this.getMoneyList()));
        let retObj = calculateReturn(value, list);
        let remain = retObj.remain;
        let newList = retObj.list;
        if (remain === 0) {
            this.setStaticArray(newList);
            return true;
        }
        else {
            let reverseList = JSON.parse(JSON.stringify(this.getMoneyList()));
            reverseList = reverseList.sort((a, b) => a.value < b.value ? 1 : -1);
            let newRet = calculateReturn(value, reverseList);
            let newRem = newRet.remain;
            let newRetList = newRet.list;
            if (newRem === 0) {
                this.setStaticArray(newRetList);
                return true;
            }
            else {
                return false;
            }
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
