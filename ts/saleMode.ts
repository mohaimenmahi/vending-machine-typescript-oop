import { State } from "./state";
import {question} from 'readline-sync'
import {Product} from './products'

export class SaleMode extends State {
  static recieve = 0;

  public handleSelect(): string {
    let input: string = question("Sale Menu (A = Parchase, B = Product Selection):\t");

    return input.toUpperCase();
  }  

  public handleA(): void {

  }

  public handleB(): void {
    
  }
}