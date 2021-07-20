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
    static addConfigProduct(product) {
        let list = Product.productList;
        let index = list.findIndex((item) => item.code === product.code);
        if (index >= 0) {
            Product.productList[index].count += 1;
        }
        else {
            Product.productList.push(product);
        }
    }
    static removeProduct(code) {
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
    static getProduct(code) {
        let list = Product.productList;
        let product = list.find((item) => {
            if (item.code === code) {
                return item;
            }
        });
        return product;
    }
    static getProductList() {
        return Product.productList;
    }
}
exports.Product = Product;
