"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const money_1 = require("./money");
const AddMoney_1 = require("./AddMoney");
const configMode_1 = require("./configMode");
class MoneyConfig extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Config Money (A = Add/Update Money, B = Remove Money): ");
        return input.toUpperCase();
    }
    handleA() {
        this.context.transitionTo(new AddMoney_1.AddMoney());
    }
    handleB() {
        let money = money_1.Money.getMoneyInstance();
        let code = readline_sync_1.question("Enter code: ");
        let remove = money.removeConfigMoney(code);
        if (remove)
            console.log("Money Removed successfully.");
        else
            console.log("Selected money is not available in System.");
        this.context.transitionTo(new configMode_1.ConfigMode());
    }
}
exports.MoneyConfig = MoneyConfig;
