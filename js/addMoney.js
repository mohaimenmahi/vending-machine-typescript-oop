"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const money_1 = require("./money");
class AddMoney extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Config Money (A = Add Money, B = Update Money Count): ");
        return input.toUpperCase();
    }
    handleA() {
        console.log("Add new money by following: ");
        let type = readline_sync_1.question("Type (Coin/Note): ");
        let composition = readline_sync_1.question("Composition: ");
        let color = readline_sync_1.question("Color: ");
        let obverse = readline_sync_1.question("Obverse: ");
        let reverse = readline_sync_1.question("Reverse: ");
        let value = readline_sync_1.questionInt("Value: ");
        let count = readline_sync_1.questionInt("Count: ");
        let money = money_1.Money.getMoneyInstance();
        let m1 = new Object({
            composition: composition.toUpperCase(),
            color: color.toUpperCase(),
            obverse: obverse.toUpperCase(),
            reverse: reverse.toUpperCase(),
            value: value,
            count: count,
            type: type.toLowerCase()
        });
        money.addConfigMoney(m1);
        this.context.transitionTo(new AddMoney());
    }
    handleB() {
        let money = money_1.Money.getMoneyInstance();
        let code = readline_sync_1.question("Enter Code: ");
        let count = readline_sync_1.questionInt("Enter Count: ");
        let isUpdate = money.updateMoney(code, count);
        if (isUpdate) {
            console.log("Money Index updated.");
        }
        else {
            console.log("Selected money not found.");
        }
        this.context.transitionTo(new AddMoney());
    }
}
exports.AddMoney = AddMoney;
