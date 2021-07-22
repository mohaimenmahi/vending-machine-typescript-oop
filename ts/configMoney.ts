import { State } from "./state";
import {question} from 'readline-sync'

export class ConfigMoney extends State {
  public handleSelect(): string {
    let input: string = question("Config Money Mode (A = Config Money Store, B = Money Store Inventory)\t")

    return input.toUpperCase();
  }

  public handleA(): void {

  }

  public handleB(): void {

  }
}