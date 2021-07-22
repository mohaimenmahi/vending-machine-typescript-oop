import { State } from "./state";
import {question} from 'readline-sync'

export class Start extends State {
  public handleSelect(): string {
    let input: string = question("Main Menu (A = Config Mode, B = Sale Mode)\t")

    return input.toUpperCase()
  }

  public handleA(): void {

  }

  public handleB(): void {

  }
}