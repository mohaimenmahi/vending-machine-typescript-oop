import { State } from "./state";
import {question} from 'readline-sync'
import { ConfigMoney } from "./configMoney"; 
import { ConfigProduct } from "./configProduct";

export class ConfigMode extends State {
  public handleSelect(): string {
    let input: string = question("Config Mode (A = Money Config, B = Product Config): ")

    return input.toUpperCase();
  }

  public handleA(): void {
    this.context.transitionTo(new ConfigMoney())
  }

  public handleB(): void {
    this.context.transitionTo(new ConfigProduct())
  }
}