"use strict";
// singleton for products
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor() { }
    static getProductInstance() {
        if (!Product.instance) {
            Product.instance = new Product();
        }
        return Product.instance;
    }
    addConfigProduct(product) {
        let list = Product.productList;
        let index = list.findIndex((item) => item.code === product.code);
        if (index >= 0) {
            Product.productList[index].count += 1;
        }
        else {
            Product.productList.push(product);
        }
    }
    removeProduct(code) {
        let list = Product.productList;
        let index = list.findIndex((item) => item.code === code);
        if (index >= 0) {
            if (Product.productList[index].count > 1) {
                Product.productList[index].count -= 1;
            }
            else {
                Product.productList = Product.productList.filter((item) => item.code !== code);
            }
        }
    }
    getProduct(code) {
        let list = Product.productList;
        let product = list.find((item) => {
            if (item.code === code) {
                return item;
            }
        });
        return product;
    }
    getProductList() {
        return Product.productList;
    }
}
exports.Product = Product;
