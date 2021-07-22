"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const saleMode_1 = require("./saleMode");
const configMode_1 = require("./configMode");
class Start extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Main Menu (A = Config Mode, B = Sale Mode): ");
        return input.toUpperCase();
    }
    handleA() {
        this.password = 'admin123';
        let input = readline_sync_1.question("Enter Secret code: ", { hideEchoBack: true });
        if (input === this.password) {
            this.context.transitionTo(new configMode_1.ConfigMode());
        }
        else {
            console.log("Secret code is not correct.");
            this.context.transitionTo(new Start());
        }
    }
    handleB() {
        this.context.transitionTo(new saleMode_1.SaleMode());
    }
}
exports.Start = Start;
