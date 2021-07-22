"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
class ConfigMode extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Config Mode (A = Money Config, B = Product Config)\t");
        return input.toUpperCase();
    }
    handleA() {
    }
    handleB() {
    }
}
exports.ConfigMode = ConfigMode;
