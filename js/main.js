"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vending_machine_1 = require("./vending-machine");
const start_1 = require("./start");
const money_1 = require("./money");
const products_1 = require("./products");
function main() {
    money_1.init();
    products_1.productInit();
    let context = new vending_machine_1.VMContext(new start_1.Start());
    context.takeInput();
}
main();
