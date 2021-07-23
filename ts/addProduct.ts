import { State } from "./state";
import {question, questionInt} from 'readline-sync';
import { Product } from "./products";
import { ConfigMode } from "./configMode";

export class AddProduct extends State {
  public handleSelect(): string {
    let input: string = question("Product Settings (A = Add Product, B = Update Product):");

    return input.toUpperCase();
  }

  public handleA(): void {
    let product = Product.getProductInstance();

    let name: string = question("Product Name: ");
    let code: string = question("Product Code: ");
    let price: number = questionInt("Product Price: ");
    let count: number = questionInt("Product Count: ");

    let p1 = new Object({
      name: name,
      price: price,
      code: code,
      count: count
    });

    product.addConfigProduct(p1);

    this.context.transitionTo(new ConfigMode())
  } 

  public handleB(): void {
    let product = Product.getProductInstance();

    let code: string = question("Product Code: ");
    let count: number = questionInt("Product Count: ");
    let price: number = questionInt("Product Price: ");

    product.updateProduct(code, count, price);

    this.context.transitionTo(new ConfigMode())
  }
}