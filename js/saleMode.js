"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const readline_sync_1 = require("readline-sync");
const products_1 = require("./products");
const money_1 = require("./money");
class SaleMode extends state_1.State {
    handleSelect() {
        let input = readline_sync_1.question("Sale Menu (A = Parchase, B = Product Selection): ");
        return input.toUpperCase();
    }
    handleA() {
        let money = money_1.Money.getMoneyInstance();
        let code = readline_sync_1.question("Enter Coins/Notes: ");
        let getValue = money.insertMoney(code);
        if (getValue) {
            SaleMode.recieve += getValue.value;
            console.log("You have entered total Amount of: ", SaleMode.recieve);
        }
        else {
            console.log("The Note/Coin you entered is not accepted by the system. Please try another");
        }
        this.context.transitionTo(new SaleMode());
    }
    handleB() {
        let product = products_1.Product.getProductInstance();
        let money = money_1.Money.getMoneyInstance();
        let productCode = readline_sync_1.question("Enter Code: ");
        let getProduct = product.getProduct(productCode);
        if (getProduct) {
            let remove = product.removeProduct(productCode);
            if (remove) {
                console.log(`Please collect your "${remove.name}"`);
                let remain = SaleMode.recieve - remove.price;
                if (remain > 0) {
                    let returnMoney = money.returnMoney(remain);
                    if (returnMoney) {
                        console.log(`Please collect ${remain}Tk as change.`);
                        SaleMode.recieve = 0;
                        this.context.transitionTo(new SaleMode());
                    }
                    else {
                        console.log("Notes/Coins are not available for make the change");
                        product.addConfigProduct(remove);
                        let cashback = money.returnMoney(SaleMode.recieve);
                        if (cashback) {
                            console.log(`Please collect ${SaleMode.recieve}Tk.`);
                            SaleMode.recieve = 0;
                            this.context.transitionTo(new SaleMode);
                        }
                    }
                }
                else if (remain < 0) {
                    console.log("Inserted money is not sufficient to parchase the selected product");
                    this.context.transitionTo(new SaleMode());
                }
                else {
                    console.log("Thanks for using smart vending!");
                    SaleMode.recieve = 0;
                    this.context.transitionTo(new SaleMode());
                    //this.context.takeInput();
                }
            }
            else {
                console.log("Something went wrong. Please try later.");
                let remain = SaleMode.recieve;
                let returnMoney = money.returnMoney(remain);
                if (returnMoney) {
                    console.log(`Please collect ${remain}Tk as return`);
                    SaleMode.recieve = 0;
                    this.context.transitionTo(new SaleMode());
                }
            }
        }
        else {
            console.log("Product is not available right now. Please try another.");
            let remain = SaleMode.recieve;
            let returnMoney = money.returnMoney(remain);
            if (returnMoney) {
                console.log(`Please collect ${remain}Tk as return`);
                SaleMode.recieve = 0;
                this.context.transitionTo(new SaleMode());
            }
        }
    }
}
exports.SaleMode = SaleMode;
SaleMode.recieve = 0;
