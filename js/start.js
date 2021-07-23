"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const saleMode_1 = require("./saleMode");
const configMode_1 = require("./configMode");
const products_1 = require("./products");
class Start extends state_1.State {
    constructor() {
        super(...arguments);
        this.password = 'admin123';
    }
    handleSelect() {
        let input = readline_sync_1.question("Main Menu (A = Config Mode, B = Sale Mode): ");
        return input.toUpperCase();
    }
    handleA() {
        if (Start.needPass) {
            let input = readline_sync_1.question("Enter Secret code: ", { hideEchoBack: true });
            if (input === this.password) {
                this.context.transitionTo(new configMode_1.ConfigMode());
            }
            else {
                console.log("Secret code is not correct.");
                this.context.transitionTo(new Start());
            }
        }
        else {
            this.context.transitionTo(new configMode_1.ConfigMode());
        }
    }
    handleB() {
        Start.needPass = true;
        let product = products_1.Product.getProductInstance();
        let allProducts = product.getProductList();
        let len = allProducts.length;
        console.log("Name:\t\tCode:\t\tPrice:");
        for (let i = 0; i < len; i++) {
            let item = allProducts[i];
            console.log(`${item.name}\t\t${item.code}\t\t${item.price}`);
        }
        this.context.transitionTo(new saleMode_1.SaleMode());
    }
}
exports.Start = Start;
Start.needPass = false;
