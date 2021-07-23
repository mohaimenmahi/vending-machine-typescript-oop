"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const configMoneyStore_1 = require("./configMoneyStore");
const money_1 = require("./money");
class ConfigMoney extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Money Store Mode (A = Config Money Store, B = Money Store Inventory): ");
        return input.toUpperCase();
    }
    handleA() {
        this.context.transitionTo(new configMoneyStore_1.MoneyConfig());
    }
    handleB() {
        let money = money_1.Money.getMoneyInstance();
        let allMoney = money.getMoneyList();
        let pc = 0, amount = 0;
        let len = allMoney.length;
        console.log("Type\tValue(Taka):\tQuantity(pcs)\t");
        for (let i = 0; i < len; i++) {
            let item = allMoney[i];
            pc += item.count;
            amount += item.value * allMoney[i].count;
            console.log(`${item.type}\t${item.value}\t\t${item.count}`);
        }
        console.log(`\tTotal amount ${amount} Tk. and Quantity of coins and notes are ${pc} Pcs.`);
        this.context.transitionTo(new ConfigMoney());
    }
}
exports.ConfigMoney = ConfigMoney;
