"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const products_1 = require("./products");
const validator_1 = require("./validator");
class AddProduct extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Product Settings (A = Add Product, B = Update Product): ");
        return input.toUpperCase();
    }
    handleA() {
        let product = products_1.Product.getProductInstance();
        let name = readline_sync_1.question("Product Name: ");
        let checkName = validator_1.validConvert(name);
        let code = readline_sync_1.question("Product Code: ");
        code = validator_1.validConvert(code);
        let price = readline_sync_1.questionInt("Product Price: ");
        let count = readline_sync_1.questionInt("Product Count: ");
        if (validator_1.isString(checkName) && validator_1.isString(code)) {
            let p1 = new Object({
                name: name,
                price: price,
                code: code,
                count: count
            });
            product.addConfigProduct(p1);
            console.log("Product Added Successfully!");
        }
        else {
            console.log("Some Inputs are not valid. Please Try Again");
        }
        this.context.transitionTo(new AddProduct());
    }
    handleB() {
        let product = products_1.Product.getProductInstance();
        let code = readline_sync_1.question("Product Code: ");
        code = validator_1.validConvert(code);
        let count = readline_sync_1.questionInt("Product Count: ");
        let price = readline_sync_1.questionInt("Product Price: ");
        if (validator_1.isString(code)) {
            product.updateProduct(code, count, price);
            console.log("Product Updated Successfully");
        }
        else {
            console.log("Some Inputs are not valid. Please Try Again");
        }
        this.context.transitionTo(new AddProduct());
    }
}
exports.AddProduct = AddProduct;
