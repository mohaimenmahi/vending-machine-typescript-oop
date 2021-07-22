import { State } from "./state";
import {question} from 'readline-sync'

export class ConfigMode extends State {
  public handleSelect(): string {
    let input: string = question("Config Mode (A = Money Config, B = Product Config)\t")

    return input.toUpperCase();
  }

  public handleA(): void {

  }

  public handleB(): void {
    
  }
}