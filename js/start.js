"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
class Start extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Main Menu (A = Config Mode, B = Sale Mode)\t");
        return input.toUpperCase();
    }
    handleA() {
    }
    handleB() {
    }
}
exports.Start = Start;
