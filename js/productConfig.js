"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const products_1 = require("./products");
const addProduct_1 = require("./addProduct");
const validator_1 = require("./validator");
class ProductConfig extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Product Config Mode (A = Add/Update Product, B = Remove Product): ");
        return input.toUpperCase();
    }
    handleA() {
        this.context.transitionTo(new addProduct_1.AddProduct());
    }
    handleB() {
        let product = products_1.Product.getProductInstance();
        let code = readline_sync_1.question("Enter Product Code: ");
        code = validator_1.validConvert(code);
        if (validator_1.isString(code)) {
            let remove = product.deleteProduct(code);
            if (remove)
                console.log("Product Removed Successfully");
            else
                console.log("No Such Products available in the system");
        }
        else {
            console.log("Input value is not valid");
        }
        this.context.transitionTo(new ProductConfig());
    }
}
exports.ProductConfig = ProductConfig;
