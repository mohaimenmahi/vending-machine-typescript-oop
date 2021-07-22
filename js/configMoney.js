"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
class ConfigMoney extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Config Money Mode (A = Config Money Store, B = Money Store Inventory)\t");
        return input.toUpperCase();
    }
    handleA() {
    }
    handleB() {
    }
}
exports.ConfigMoney = ConfigMoney;
