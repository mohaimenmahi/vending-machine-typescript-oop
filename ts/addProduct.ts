import { State } from "./state";
import {question, questionInt} from 'readline-sync';
import { Product } from "./products";
import { ConfigMode } from "./configMode";
import { isString, validConvert } from "./validator";

export class AddProduct extends State {
  public handleSelect(): string {
    let input: string = question("Product Settings (A = Add Product, B = Update Product): ");

    return input.toUpperCase();
  }

  public handleA(): void {
    let product = Product.getProductInstance();

    let name: string = question("Product Name: ");
    let checkName = validConvert(name);

    let code: string = question("Product Code: ");
    code = validConvert(code);

    let price: number = questionInt("Product Price: ");
    let count: number = questionInt("Product Count: ");

    if(isString(checkName) && isString(code)) {
      let p1 = new Object({
        name: name,
        price: price,
        code: code,
        count: count
      });
  
      product.addConfigProduct(p1);
      
      console.log("Product Added Successfully!")
    } else {
      console.log("Some Inputs are not valid. Please Try Again")
    }

    this.context.transitionTo(new AddProduct())
  } 

  public handleB(): void {
    let product = Product.getProductInstance();

    let code: string = question("Product Code: ");
    code = validConvert(code);

    let count: number = questionInt("Product Count: ");
    let price: number = questionInt("Product Price: ");

    if(isString(code)) {
      product.updateProduct(code, count, price);
      console.log("Product Updated Successfully")
    } else {
      console.log("Some Inputs are not valid. Please Try Again")
    }

    this.context.transitionTo(new AddProduct())
  }
}