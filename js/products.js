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
            list[index].count += product.count;
        }
        else {
            list.push(product);
        }
        this.setProductList(list);
    }
    updateProduct(code, count, price) {
        let list = this.getProductList();
        let index = list.findIndex((item) => item.code === code);
        if (index >= 0) {
            list[index].count = count;
            list[index].price = price;
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
            return list[index];
        }
        else
            return null;
    }
    deleteProduct(code) {
        let list = Product.productList;
        let index = list.findIndex((item) => item.code === code);
        if (index >= 0) {
            list = list.filter((item) => item.code !== code);
            this.setProductList(list);
            return true;
        }
        else
            return false;
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
function productInit() {
    let product = Product.getProductInstance();
    let p1 = new Object({
        name: "Coke",
        price: 40,
        code: "101",
        count: 5
    });
    product.addConfigProduct(p1);
    let p2 = new Object({
        name: "Pringles",
        price: 100,
        code: "201",
        count: 5
    });
    product.addConfigProduct(p2);
    let p3 = new Object({
        name: "Snikers",
        price: 60,
        code: "301",
        count: 5
    });
    product.addConfigProduct(p3);
}
exports.productInit = productInit;
