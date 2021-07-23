"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const money_1 = require("./money");
const validator_1 = require("./validator");
class AddMoney extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Config Money (A = Add Money, B = Update Money Count): ");
        return input.toUpperCase();
    }
    handleA() {
        console.log("Add new money by following: ");
        let type = readline_sync_1.question("Type (Coin/Note): ");
        type = validator_1.validConvert(type);
        let composition = readline_sync_1.question("Composition: ");
        composition = validator_1.validConvert(composition);
        let color = readline_sync_1.question("Color: ");
        color = validator_1.validConvert(color);
        let obverse = readline_sync_1.question("Obverse: ");
        obverse = validator_1.validConvert(obverse);
        let reverse = readline_sync_1.question("Reverse: ");
        reverse = validator_1.validConvert(reverse);
        let value = readline_sync_1.questionInt("Value: ");
        let count = readline_sync_1.questionInt("Count: ");
        if (validator_1.isString(type) &&
            validator_1.isString(composition) &&
            validator_1.isString(color) &&
            validator_1.isString(obverse) &&
            validator_1.isString(reverse) &&
            value > 0 &&
            count >= 0) {
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
            console.log("Money Added to the system!");
        }
        else {
            console.log("One or Many inputs are invalid.");
        }
        this.context.transitionTo(new AddMoney());
    }
    handleB() {
        let money = money_1.Money.getMoneyInstance();
        let code = readline_sync_1.question("Enter Code: ");
        let count = readline_sync_1.questionInt("Enter Count: ");
        if (validator_1.isString(code) &&
            count >= 0) {
            let isUpdate = money.updateMoney(code, count);
            if (isUpdate) {
                console.log("Money Index updated.");
            }
            else {
                console.log("Selected money not found.");
            }
        }
        else {
            console.log("Input is not valid.");
        }
        this.context.transitionTo(new AddMoney());
    }
}
exports.AddMoney = AddMoney;
