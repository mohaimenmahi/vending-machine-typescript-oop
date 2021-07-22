"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
class ConfigProduct extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Product Config Mode (A = Config Product, B = Product Inventory)\t");
        return input.toUpperCase();
    }
    handleA() {
    }
    handleB() {
    }
}
exports.ConfigProduct = ConfigProduct;
