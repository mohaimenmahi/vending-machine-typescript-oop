import { State } from "./state";
import {question} from 'readline-sync'
import {Product} from './products'
import {Money} from './money'

export class SaleMode extends State {
  static recieve: number = 0;

  public handleSelect(): string {
    let input: string = question("Sale Menu (A = Parchase, B = Product Selection): ");

    return input.toUpperCase();
  }  

  public handleA(): void {
    let money = Money.getMoneyInstance();

    let code: string = question("Enter Coins/Notes: ")

    let getValue: any = money.insertMoney(code);

    if(getValue) {
      SaleMode.recieve += getValue.value;
      console.log("You have entered total Amount of: ", SaleMode.recieve)
    } else {
      console.log("The Note/Coin you entered is not accepted by the system. Please try another")
    }

    this.context.transitionTo(new SaleMode())
  }

  public handleB(): void {
    let product = Product.getProductInstance();
    let money = Money.getMoneyInstance()

    let productCode: string = question("Enter Code: ");

    let getProduct: any = product.getProduct(productCode);

    if(getProduct) {
      let remain = SaleMode.recieve - getProduct.price;

      if(remain > 0) {
        let returnMoney = money.returnMoney(remain);

        if(returnMoney) {
          console.log(`Please Collect your "${getProduct.name}"`)
          console.log(`Please collect ${remain}Tk as change.`);
          console.log("Thanks for using smart vending!")
          SaleMode.recieve = 0;
          product.removeProduct(productCode);
          this.context.transitionTo(new SaleMode());
        } else {
          console.log("Notes/Coins are not available for make the change")
          
          let cashback = money.returnMoney(SaleMode.recieve);

          if(cashback) {
            console.log(`Please collect ${SaleMode.recieve}Tk.`)
            SaleMode.recieve = 0;
            this.context.transitionTo(new SaleMode())
          }
        }
      } else if(remain < 0) {
        console.log("Inserted money is not sufficient to parchase the selected product");
        let cashback = money.returnMoney(SaleMode.recieve);

        if(cashback) {
          console.log(`Please collect ${SaleMode.recieve}Tk.`)
          SaleMode.recieve = 0;
          this.context.transitionTo(new SaleMode())
        }
      } else {
        console.log(`Please Collect your "${getProduct.name}"`)
        console.log("Thanks for using smart vending!")
        SaleMode.recieve = 0;
        this.context.transitionTo(new SaleMode());
      }
    } else {
      console.log("Product is not available right now. Please try another.")
      let remain = SaleMode.recieve;

      let returnMoney = money.returnMoney(remain);

      if(returnMoney) {
        console.log(`Please collect ${remain}Tk as return`);
        SaleMode.recieve = 0;
        this.context.transitionTo(new SaleMode());
      }
    }
  }
}