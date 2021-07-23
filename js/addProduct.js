"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const products_1 = require("./products");
const configMode_1 = require("./configMode");
class AddProduct extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Product Settings (A = Add Product, B = Update Product):");
        return input.toUpperCase();
    }
    handleA() {
        let product = products_1.Product.getProductInstance();
        let name = readline_sync_1.question("Product Name: ");
        let code = readline_sync_1.question("Product Code: ");
        let price = readline_sync_1.questionInt("Product Price: ");
        let count = readline_sync_1.questionInt("Product Count: ");
        let p1 = new Object({
            name: name,
            price: price,
            code: code,
            count: count
        });
        product.addConfigProduct(p1);
        this.context.transitionTo(new configMode_1.ConfigMode());
    }
    handleB() {
        let product = products_1.Product.getProductInstance();
        let code = readline_sync_1.question("Product Code: ");
        let count = readline_sync_1.questionInt("Product Count: ");
        let price = readline_sync_1.questionInt("Product Price: ");
        product.updateProduct(code, count, price);
        this.context.transitionTo(new configMode_1.ConfigMode());
    }
}
exports.AddProduct = AddProduct;
