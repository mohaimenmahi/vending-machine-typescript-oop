"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const money_1 = require("./money");
const addMoney_1 = require("./addMoney");
const validator_1 = require("./validator");
class MoneyConfig extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Config Money (A = Add/Update Money, B = Remove Money): ");
        return input.toUpperCase();
    }
    handleA() {
        this.context.transitionTo(new addMoney_1.AddMoney());
    }
    handleB() {
        let money = money_1.Money.getMoneyInstance();
        let code = readline_sync_1.question("Enter code: ");
        code = validator_1.validConvert(code);
        if (validator_1.isString(code)) {
            let remove = money.removeConfigMoney(code);
            if (remove)
                console.log("Money Removed successfully.");
            else
                console.log("Selected money is not available in System.");
        }
        else {
            console.log("Input is not valid.");
        }
        this.context.transitionTo(new MoneyConfig());
    }
}
exports.MoneyConfig = MoneyConfig;
