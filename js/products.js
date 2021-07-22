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
    getProductList() {
        return Product.productList;
    }
    setProductList(list) {
        Product.productList = list;
    }
    addConfigProduct(product) {
        let list = this.getProductList();
        let index = list.findIndex((item) => item.code === product.code);
        if (index >= 0) {
            list[index].count += 1;
        }
        else {
            list.push(product);
        }
        this.setProductList(list);
    }
    removeProduct(code) {
        let list = Product.productList;
        let index = list.findIndex((item) => item.code === code);
        if (index >= 0) {
            if (list[index].count > 1) {
                list[index].count -= 1;
            }
            else {
                list = list.filter((item) => item.code !== code);
            }
            this.setProductList(list);
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
}
exports.Product = Product;
Product.productList = [];
