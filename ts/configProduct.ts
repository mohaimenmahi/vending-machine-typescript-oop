import { State } from "./state";
import {question} from 'readline-sync'
import { ProductConfig } from "./productConfig";
import { Product } from "./products";
import { ConfigMode } from "./configMode";

export class ConfigProduct extends State {
  public handleSelect(): string {
    let input: string = question("Product Store Mode (A = Config Product, B = Product Inventory): ")

    return input.toUpperCase();
  }

  public handleA(): void {
    this.context.transitionTo(new ProductConfig())
  }

  public handleB(): void {
    let product = Product.getProductInstance();

    let allProducts = product.getProductList();

    let len = allProducts.length;
    
    console.log("Name:\t\tCode:\t\tPrice:\t\tQuantity:")

    for(let i = 0; i < len; i++) {
      let item = allProducts[i];

      console.log(`${item.name}\t\t${item.code}\t\t${item.price}\t\t${item.count}`)
    }
    this.context.transitionTo(new ConfigMode())
  }
}