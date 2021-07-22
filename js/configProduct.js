"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const productConfig_1 = require("./productConfig");
const products_1 = require("./products");
const configMode_1 = require("./configMode");
class ConfigProduct extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Product Store Mode (A = Config Product, B = Product Inventory): ");
        return input.toUpperCase();
    }
    handleA() {
        this.context.transitionTo(new productConfig_1.ProductConfig());
    }
    handleB() {
        let product = products_1.Product.getProductInstance();
        let allProducts = product.getProductList();
        let len = allProducts.length;
        console.log("Name:\t\tCode:\t\tPrice:\t\tQuantity:");
        for (let i = 0; i < len; i++) {
            let item = allProducts[i];
            console.log(`${item.name}\t\t${item.code}\t\t${item.price}\t\t${item.count}`);
        }
        this.context.transitionTo(new configMode_1.ConfigMode());
    }
}
exports.ConfigProduct = ConfigProduct;
