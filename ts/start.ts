import { State } from "./state";
import {question} from 'readline-sync'
import { SaleMode } from "./saleMode";
import { ConfigMode } from "./configMode";
import { Product } from "./products";

export class Start extends State {
  public static needPass: boolean = false ;
  password: string = 'admin123';

  public handleSelect(): string {
    let input: string = question("Main Menu (A = Config Mode, B = Sale Mode): ")

    return input.toUpperCase()
  }

  public handleA(): void {
    if(Start.needPass) {
      let input = question("Enter Secret code: ", { hideEchoBack: true });

      if(input === this.password) {
        this.context.transitionTo(new ConfigMode())
      } else {
        console.log("Secret code is not correct.")
        this.context.transitionTo(new Start())
      }
    } else {
      this.context.transitionTo(new ConfigMode())
    }
  }

  public handleB(): void {
    Start.needPass = true;
    let product = Product.getProductInstance();

    let allProducts = product.getProductList();

    let len = allProducts.length;
    
    console.log("Name:\t\tCode:\t\tPrice:")

    for(let i = 0; i < len; i++) {
      let item = allProducts[i];

      console.log(`${item.name}\t\t${item.code}\t\t${item.price}`)
    }

    this.context.transitionTo(new SaleMode());
  }
}