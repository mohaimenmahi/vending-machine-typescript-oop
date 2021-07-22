"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const products_1 = require("./products");
class ProductConfig extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Product Config Mode (A = Add/Update Product, B = Remove Product): ");
        return input.toUpperCase();
    }
    handleA() {
    }
    handleB() {
        let product = products_1.Product.getProductInstance();
        let code = readline_sync_1.question("Enter Product Code: ");
        let remove = product.deleteProduct(code);
        if (remove)
            console.log("Product Removed Successfully");
        else
            console.log("No Such Products available in the system");
    }
}
exports.ProductConfig = ProductConfig;
