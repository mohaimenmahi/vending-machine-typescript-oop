"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const configMoney_1 = require("./configMoney");
const configProduct_1 = require("./configProduct");
class ConfigMode extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Config Mode (A = Money Config, B = Product Config): ");
        return input.toUpperCase();
    }
    handleA() {
        this.context.transitionTo(new configMoney_1.ConfigMoney());
    }
    handleB() {
        this.context.transitionTo(new configProduct_1.ConfigProduct());
    }
}
exports.ConfigMode = ConfigMode;
