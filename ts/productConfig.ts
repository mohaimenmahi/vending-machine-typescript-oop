import { State } from "./state";
import {question} from 'readline-sync';
import { Product } from "./products";
import { AddProduct } from "./addProduct";
import { isString, validConvert } from "./validator";

export class ProductConfig extends State {
  public handleSelect(): string {
    let input: string = question("Product Config Mode (A = Add/Update Product, B = Remove Product): ");

    return input.toUpperCase();
  }

  public handleA(): void {
    this.context.transitionTo(new AddProduct());
  } 

  public handleB(): void {
    let product = Product.getProductInstance();

    let code: string = question("Enter Product Code: ");

    code = validConvert(code);

    if(isString(code)) {
      let remove = product.deleteProduct(code);

      if(remove) console.log("Product Removed Successfully");
      else console.log("No Such Products available in the system");

    } else {
      console.log("Input value is not valid")
    }

    this.context.transitionTo(new ProductConfig())
  }
}