import { State } from "./state";
import {question} from 'readline-sync'
import { SaleMode } from "./saleMode";
import { ConfigMode } from "./configMode";

export class Start extends State {
  password: string;
  public handleSelect(): string {
    let input: string = question("Main Menu (A = Config Mode, B = Sale Mode): ")

    return input.toUpperCase()
  }

  public handleA(): void {
    this.password = 'admin123';

    let input = question("Enter Secret code: ", { hideEchoBack: true });

    if(input === this.password) {
      this.context.transitionTo(new ConfigMode())
    } else {
      console.log("Secret code is not correct.")
      this.context.transitionTo(new Start())
    }
  }

  public handleB(): void {
    this.context.transitionTo(new SaleMode());
  }
}