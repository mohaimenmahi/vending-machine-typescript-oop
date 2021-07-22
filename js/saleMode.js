"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
class SaleMode extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Sale Menu (A = Parchase, B = Product Selection):\t");
        return input.toUpperCase();
    }
    handleA() {
    }
    handleB() {
    }
}
exports.SaleMode = SaleMode;
SaleMode.recieve = 0;
