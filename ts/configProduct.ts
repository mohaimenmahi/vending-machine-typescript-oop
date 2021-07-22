import { State } from "./state";
import {question} from 'readline-sync'

export class ConfigProduct extends State {
  public handleSelect(): string {
    let input: string = question("Product Config Mode (A = Config Product, B = Product Inventory)\t")

    return input.toUpperCase();
  }

  public handleA(): void {

  }

  public handleB(): void {
    
  }
}